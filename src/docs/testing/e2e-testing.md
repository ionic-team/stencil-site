---
title: End-to-end Testing
description: End-to-end Testing
url: /docs/end-to-end-testing
contributors:
  - adamdbradley
  - mattdsteele
  - simonhaenisch
---

# End-to-end Testing

E2E tests verify your components in a real browser. For example, when `my-component` has the X attribute, the child component then renders the text Y, and expects to receive the event Z. By using Puppeteer for rendering tests (rather than a Node environment simulating how a browser works), your end-to-end tests are able to run within an actual browser in order to give better results.

Stencil provides many utility functions to help test [Jest](https://jestjs.io/) and [Puppeteer](https://pptr.dev/). For example, a component's shadow dom can be queried and tested with the Stencil utility functions built on top of Puppeteer. Tests can not only be provided mock HTML content, but they can also go to URLs of your app which Puppeteer is able to open up and test on Stencil's dev server.

End-to-end tests require a fresh build, dev-server, and puppeteer browser instance created before the tests can actually run. With the added build complexities, the `stencil test` command is able to organize the build requirements beforehand.

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
    expect(el).not.toBeNull();
  });
});
```

## Example End-to-end Test

```typescript
import { newE2EPage } from '@stencil/core/testing';

it('should create toggle, unchecked by default', async () => {
  const page = await newE2EPage();

  await page.setContent(`
    <ion-toggle class="pretty-toggle"></ion-toggle>
  `);

  const ionChange = await page.spyOnEvent('ionChange');

  const toggle = await page.find('ion-toggle');

  expect(toggle).toHaveClasses(['pretty-toggle', 'hydrated']);

  expect(toggle).not.toHaveClass('toggle-checked');

  toggle.setProperty('checked', true);

  await page.waitForChanges();

  expect(toggle).toHaveClass('toggle-checked');

  expect(ionChange).toHaveReceivedEventDetail({
    checked: true,
    value: 'on'
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

#### Set a @Prop() on a component using an external reference

Because `page.$eval` has an isolated scope, you’ll have to explicity pass in outside references otherwise you’ll an encounter an `undefined` error. This is useful in case you’d like to import data from another file, or re-use mock data across multiple tests in the same file.

```typescript
const props = {
  first: 'Marty',
  lastName: 'McFly',
};

await page.setContent(`<prop-cmp></prop-cmp>`);

await page.$eval('prop-cmp',
  (elm: any, { first, lastName }) => {
    elm.first = first;
    elm.lastName = lastName;
  },
  props 
);

await page.waitForChanges();
```


#### Call a @Method() on a component

```typescript
const elm = await page.find('method-cmp');
elm.setProperty('someProp', 88);
const methodRtnValue = await elm.callMethod('someMethod');
```

#### Type inside an input field

```typescript
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

```typescript
await page.setContent(`
      <prop-cmp first="Marty" last-name="McFly"></prop-cmp>
    `);

const elm = await page.find('prop-cmp >>> div');
expect(elm).toEqualText('Hello, my name is Marty McFly');
```

#### Checking a component's HTML

For shadowRoot content:

```typescript
        expect(el.shadowRoot).toEqualHtml(`<div>
        <div class=\"nav-desktop\">
          <slot></slot>
        </div>
      </div>`);
    });
```

For non-shadow content:

```typescript
        expect(el).toEqualHtml(`<div>
        <div class=\"nav-desktop\">
          <slot></slot>
        </div>
      </div>`);
    });
```
