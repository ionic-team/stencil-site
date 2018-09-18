# Testing

Stencil makes it easy to unit test your component using Jest and the Stencil unit testing framework.
The testing framework requires very little configuration and has a minimal API.
The Stencil unit testing framework can be used to test the rendering of the component
as well as the methods defined on the component class.

Testing is executed with the `stencil test` command.

## Setup

All of this configuration is included with the Stencil App Starter and the Stencil Component Starter so if you
use one of those templates to start your project, you should not have to add anything. This information is presented
here primarily for informational purposes.

_TODO: More docs on setup_

### Additional Configuration

Stencil will apply defaults from data it has already gathered. For example, Stencil already knows what directories to look through, and what files are spec and e2e files. Jest can still be configured using the same config names, but now using the stencil config `testing` property.
It's also recommended to use the typed version of stencil.config .ts so you'll be able to see the typed configs and descriptions.

```typescript
import { Config } from '@stencil/core';

export const config: Config = {
  testing: {
    testPathIgnorePatterns: [...]
  }
};
```

## Unit Tests

Unit testing is for testing small chunks of code at the lowest level. For example, when a method is given X, it should return Y. Unit tests should not be doing full rendering of the component, but rather focused on logic only.

To run unit tests, run `stencil test --unit`. Files ending in `.spec.ts` will be executed.

Typically, unit tests will instantiate a component by importing the class, and instantiating and instrumenting it manually.
Since Stencil components are plain JavaScript objects, you can `new` one up and execute its behavior as such.

An example unit test:

```typescript
import { Foo } from './foo';

describe('example', () => {
  it('can invoke the add() method', () => {
    const foo = new Foo();
    const sum = foo.add(2, 3);
    expect(sum).toBe(5);
  });
});
```

## End-To-End (aka Rendering) Tests

E2E tests verify your components in a real browser. For example, when `my-component` has the X attribute, the child component then renders the text Y, and expects to receive the event Z. By using Puppeteer for rendering tests (rather than a Node environment simulating how a browser works), your end-to-end tests are able to run within an actual browser in order to give better results.

To run E2E tests, run `stencil test --e2e`. By default, files ending in `.e2e.ts` will be executed.

Stencil's E2E test are provided with the following API, available via `@stencil/core/testing`.
Most methods are async and return Promises. Use `async` and `await` to declutter your tests.

- `newE2EPage`: Should be invoked at the start of each test to instantiate a new `E2EPage` object

`E2EPage` is a wrapper utility to Puppeteer to simplify writing tests. Some helpful methods on `E2EPage` include:

- `setContent(html: string)`: Sets the content of a page. This is where you would include the markup of the component under test.
- `find(selector: string)`: Find an element that matches the selector. Similar to `document.querySelector`.
- `waitForChanges()`: Both Stencil and Puppeteer have an asynchronous architecture, which is a good thing for performance. Since all calls are async, it's required that `await page.waitForChanges()` is called when changes are made to components.

An example E2E test might have the following boilerplate:

```typescript
import { newE2EPage } from '@stencil/core/testing';

describe('example', () => {
  it('should render a foo-component', async () => {
    const page = await newE2EPage();
    await page.setContent(`<foo-component></foo-component>`);
    const el = await page.find('foo-component');
    expect(el).toBeDefined();
  });
});
```

## E2E Testing Recipes

#### Find an element in the Shadow DOM

Use the "piercing" selector `>>>` to query for an object inside a component's shadow root:

```typescript
const el = await page.find('foo-component >>> .close-button');
```

#### Set a @Prop() on a component

Use `page.$eval` (part of the Puppeteer API) to set props or otherwise manipulate a component:

```typescript
// create a new puppeteer page
// load the page with html content
await page.setContent(`
      <prop-cmp></prop-cmp>
    `);

// select the "prop-cmp" element
// and run the callback in the browser's context
await page.$eval('prop-cmp', (elm: any) => {
  // within the browser's context
  // let's set new property values on the component
  elm.first = 'Marty';
  elm.lastName = 'McFly';
});

// we just made a change and now the async queue need to process it
// make sure the queue does its work before we continue
await page.waitForChanges();
```

#### Call a @Method() on a component

```ts
const elm = await page.find('method-cmp');
elm.setProperty('someProp', 88);
const methodRtnValue = await elm.callMethod('someMethod');
```

#### Type inside an input field

```ts
const page = await newE2EPage({
  html: `
      <dom-interaction></dom-interaction>
    `
});

const input = await page.find('dom-interaction >>> .input');

let value = await input.getProperty('value');
expect(value).toBe('');

await input.press('8');
await input.press('8');
await input.press(' ');

await page.keyboard.down('Shift');
await input.press('KeyM');
await input.press('KeyP');
await input.press('KeyH');
await page.keyboard.up('Shift');
```

#### Checking the text of a rendered component

```ts
await page.setContent(`
      <prop-cmp first="Marty" last-name="McFly"></prop-cmp>
    `);

const elm = await page.find('prop-cmp >>> div');
expect(elm).toEqualText('Hello, my name is Marty McFly');
```

#### Checking a component's HTML

For shadowRoot content:

```ts
        expect(el.shadowRoot).toEqualHtml(`<div>
        <div class=\"nav-desktop\">
          <slot></slot>
        </div>
      </div>`);
    });
```

For non-shadow content:

```ts
        expect(el).toEqualHtml(`<div>
        <div class=\"nav-desktop\">
          <slot></slot>
        </div>
      </div>`);
    });
```
