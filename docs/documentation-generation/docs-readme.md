---
title: Docs Readme Auto-Generation
sidebar_label: README Docs (docs-readme)
description: README Docs
slug: /docs-readme
---

# Docs Readme Markdown File Auto-Generation

Stencil is able to auto-generate `readme.md` files for your components.
This can help you to maintain consistently formatted
documentation for your components which lives right next to them and render in
GitHub.

## Setup

To generate markdown files using the `docs-readme` output target, it is recommended to add the following to your Stencil configuration file:

```tsx title="stencil.config.ts"
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    { 
      type: 'docs-readme'
    }
  ]
};
```

## Generating README Files

### Using the Build Task

If your project has a `docs-readme` output target configured in your Stencil configuration file, the Stencil [build task](../config/cli.md#stencil-build) is all that's needed to generate readme docs:
```bash
npx stencil build
```
If you're running the build task with the `--watch` flag, your project's README files will automatically update without requiring multiple explicit build commands:
```bash
npm stencil build --watch
```

:::info
When running the build task with the `--dev` flag, README files will not be generated.
This is to prevent unnecessary I/O operations during the development cycle.
:::

If you choose not to include a `docs-readme` output target in your Stencil configuration file, use the `--docs` CLI flag as a part of the build task:
```bash
npx stencil build --docs
```

This will cause the Stencil compiler to perform a one-time build of your entire project, including README files.

### Using the Docs Task

As an alternative to the build task, the [docs task](../config/cli.md#stencil-docs) can be used to perform a one time generation of the documentation:
```bash
npx stencil docs
```
Running `stencil docs` will generate documentation for all documentation output targets, not just `docs-readme`.

## Generating Content

Most generated markdown content will automatically be generated without requiring any additional configuration.
Content is generated based on its Stencil component, rather than requiring you to configure multiple flags.
Each section below describes the different types of content Stencil recognizes and will automatically generate. 

### Custom Markdown Content

Once you've generated a `readme.md` file, you can add your own markdown content to the file.
You may add any content above the following comment in a component's `readme.md`:
```
Custom content goes here!
<!-- Auto Generated Below -->
```

Any custom content placed above this comment will be persisted on subsequent builds of the README file.

### Deprecation Notices

A Stencil component may be marked as deprecated using the [JSDoc `@deprecated` tag](https://jsdoc.app/tags-deprecated).
By placing `@deprecated` in a component's class-level JSDoc will cause the generated README to denote the component is deprecated.

```tsx title="my-component.tsx with @deprecated"
/**
 * A simple component for formatting names.
 * 
 * @deprecated since v2.0.0
 */
@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent { }
```

In the code block above, `@deprecated` is added to the JSDoc for `MyComponent`.
This causes the generated README to contain:
```
> **[DEPRECATED]** since v2.0.0
```

The deprecation notice will always begin with `> **[DEPRECATED]**`, followed by the deprecation description.
In this case, that description is "since v2.0.0".

The deprecation notice will be placed after the [`<!-- Auto Generated Below -->` comment](#custom-markdown-content) in the README.

If a component is not marked as deprecated, this section will be omitted from the generated README.

### Overview Documentation

A Stencil component that has a JSDoc comment on its class component like so:

```tsx title="my-component.tsx with an overview"
/**
 * A simple component for formatting names
 *
 * This component will do some neat things!
 */
@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent { }
```
will generate the following section in your component's README:

```
## Overview

A simple component for formatting names

This component will do some neat things!
```

The overview will be placed after the [deprecation notice](#deprecation-notices) section of the README.
If a component's JSDoc does not contain an overview, this section will be omitted from the generated README.

### Usage Examples

Usage examples are user-generated markdown files that demonstrate how another developer might use a component.
These files are separate from a component's README file, and are placed in a `usage/` adjacent to a component's implementation.
The content of these files will be added to a `Usage` section of the generated README. 
This allows you to keep examples right next to the code, making it easy to include them in a documentation site or other downstream consumer(s) of your docs.

The example usage file below gives us a high level overview of how to use the component, `my-component`:

````md title="src/components/my-component/usage/my-component-usage.md"
# How to Use `my-component`

This component is used to provide a way to greet a user using their first, middle, and last name.
This component will properly format the provided name, even when all fields aren't provided:

```html
<my-component first="Stencil"></my-component>
<my-component first="Stencil" last="JS"></my-component>
```
````

When the README for `my-component` is regenerated, following will be added to the README:

````md
## Usage

### My-component-usage

# How to Use `my-component`

This component is used to provide a way to greet a user using their first, middle, and last name.
This component will properly format the provided name, even when all fields aren't provided:

```html
<my-component first="Stencil"></my-component>
<my-component first="Stencil" last="JS"></my-component>
```
````

:::caution
Stencil does not check that your usage examples are up-to-date.
If you make any changes to your component's API, you'll need to update your usage examples manually.
:::

The usage section will be placed after the [overview section](#overview-documentation) of the README.

If a component's directory does not contain any usage files, this section will be omitted from the generated README.

### @Prop() Information

Components that use Stencil's [`@Prop()` decorator](../components/properties.md) will have a section describing the fields that are decorated with `@Prop()`.
This information is presented in a table containing the following columns:
- **Property**: The name of the property on the TypeScript class.
- **Attribute**: The name of the attribute associated with the property name.
- **Description**: A description of the property, if one was given in a JSDoc comment for the property.
- **Type**: The TypeScript type of the property.
- **Default**: The default value of the property.

For the following usages of `@Prop()` in a component:
```ts
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first!: string;
  /**
   * @deprecated since v2.1.0
   */
  @Prop() middle: string;
  @Prop() lastName = "Smith";

  // ...
}
```

The following section will be generated:
```md
## Properties

| Property             | Attribute   | Description                                                            | Type     | Default     |
| -------------------- | ----------- | ---------------------------------------------------------------------- | -------- | ----------- |
| `first` _(required)_ | `first`     | The first name                                                         | `string` | `undefined` |
| `lastName`           | `last-name` |                                                                        | `string` | `"Smith"`   |
| `middle`             | `middle`    | <span style="color:red">**[DEPRECATED]**</span> since v2.1.0<br/><br/> | `string` | `undefined` |
```

The properties section will be placed after the [usage examples section](#usage-examples) of the README.

If a component does not use `@Prop()`, this section will be omitted from the generated README.

### @Event() Information

Components that use Stencil's [`@Event()` decorator](../components/events.md) will have a section describing the fields that are decorated with `@Event()`.
This information is presented in a table containing the following columns:
- **Event**: The name of the property on the TypeScript class decorated with `@Event()`.
- **Description**: A description of the property, if one was given in a JSDoc comment for the property.
- **Type**: The TypeScript type of the property.

For the following usages of `@Event()` in a component:
```tsx
export class MyComponent {
  /**
   * Emitted when an event is completed
   */
  @Event() todoCompleted: EventEmitter<number>;
  /**
   * @deprecated
   */
  @Event() todoUndo: EventEmitter<number>;

  // ...
}
```

The following section will be generated:

```md
## Events

| Event           | Description                                                | Type                  |
| --------------- | ---------------------------------------------------------- | --------------------- |
| `todoCompleted` | Emitted when an event is completed                         | `CustomEvent<number>` |
| `todoUndo`      | <span style="color:red">**[DEPRECATED]**</span> <br/><br/> | `CustomEvent<number>` |
```

The events section will be placed after the [@Prop() section](#prop-information) of the README.

If a component does not use `@Event()`, this section will be omitted from the generated README.

### @Method() Information

Components that use Stencil's [`@Method()` decorator](../components/methods.md) will have a section describing each usage `@Method`.
Each usage of `@Method` will have the following subsections generated:
- A description of the method, if one was provided in a JSDoc
- A table containing the name, TypeScript type, and description of each parameter of the method
- A description of the return value of the method, including its return type.

For the following usages of `@Method()` in a component:

```ts
export class MyComponent {
  /**
   * Scroll by a specified X/Y distance in the component.
   *
   * @param x The amount to scroll by on the horizontal axis.
   * @param y The amount to scroll by on the vertical axis.
   * @param duration The amount of time to take scrolling by that amount.
   * @returns the total distance travelled
   */
  @Method()
  // @ts-ignore
  async scrollByPoint(x: number, y: number, duration: number): Promise<number> { /* omitted */ }

  // ...
}
```

The following section will be generated:

```md
## Methods

### `scrollByPoint(x: number, y: number, duration: number) => Promise<number>`

Scroll by a specified X/Y distance in the component.

#### Parameters

| Name       | Type     | Description                                          |
| ---------- | -------- | ---------------------------------------------------- |
| `x`        | `number` | The amount to scroll by on the horizontal axis.      |
| `y`        | `number` | The amount to scroll by on the vertical axis.        |
| `duration` | `number` | The amount of time to take scrolling by that amount. |

#### Returns

Type: `Promise<number>`

the total distance travelled
```

The methods section will be placed after the [@Event section](#event-information) of the README.

If a component does not use `@Method()`, this section will be omitted from the generated README.

### @slot Details

A component that uses [slots](../components/templating-and-jsx.md#slots) may describe the component's slots in the component's JSDoc using the Stencil-specific `@slot` JSDoc tag.
The `@slot` tag follows the following format:
```
@slot [slot-name] - [description]
```
where `slot-name` corresponds to the name of the slot in the markup, and `description` describes the usage of the slot.

For this tag to be read properly, the following is required:
1. Either `slot-name` or `description` must be included. Both may be included though.
2. The '-' separating the two is required.

For the default slot, omit the `slot-name`.

This information is presented in a table containing the following columns:
- **Slot**: The name of the slot. The default slot will have no name/be empty.
- **Description**: A description of the slot, if one was given.

For the following usages of `@slot()` in a component:
```tsx
/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot primary - Content is placed to the right of the toolbar text.
 * @slot secondary - Content is placed to the left of the toolbar text.
 */
export class MyComponent {
  // ...
}
```

The following table is generated:

```md
## Slots

| Slot          | Description                                                           |
| ------------- | --------------------------------------------------------------------- |
|               | Content is placed between the named slots if provided without a slot. |
| `"primary"`   | Content is placed to the right of the toolbar text.                   |
| `"secondary"` | Content is placed to the left of the toolbar text.                    |

```

The slots section will be placed after the [@Method section](#method-information) of the README.

If a component does not use `@slot`, this section will be omitted from the generated README.

### Shadow Parts

A component that uses [shadow parts](../components/styling.md#css-parts) may describe the component's shadow parts in the component's JSDoc using the Stencil-specific `@part` JSDoc tag.
The `@part` tag follows the following format:
```
@part [part-name] - [description]
```
where `part-name` corresponds to the name of the css part in the markup, and `description` describes the usage of the shadow part.

For this tag to be read properly, the following is required:
1. Either `part-name` or `description` must be included, although using both is strongly encouraged.
2. The '-' separating the two is required.

This information is presented in a table containing the following columns:
- **Part**: The name of the shadow part.
- **Description**: A description of the shadow part, if one was given.

For the following usages of `@part()` in a component:

```tsx
/**
 * @part container - The container for the checkbox mark.
 * @part label - The label text describing the checkbox.
 * @part mark  The checkmark used to indicate the checked state.
 */
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  // ...
}
```

The following table will be generated:
```md
## Shadow Parts

| Part                                                        | Description                             |
| ----------------------------------------------------------- | --------------------------------------- |
| `"container"`                                               | The container for the checkbox mark.    |
| `"label"`                                                   | The label text describing the checkbox. |
| `"mark  The checkmark used to indicate the checked state."` |                                         |
```

The shadow parts section will be placed after the [@Slot Details](#slot-details) of the README.

If a component does not use `@part`, this section will be omitted from the generated README.

### Styling Details

Styles can be documented in Stencil components as well.
An example of this is a CSS variable that a component's styling depends on.
Using the `@prop` JSDoc in a component's CSS file, Stencil can generate this documentation as well.

This information is presented in a table containing the following columns:
- **Name**: The name of the custom property.
- **Description**: A description of the custom property, if one was given.

For the following usages of `@prop()` in a component's css file:

```css
:host {
  /**
   * @prop --border-radius: Border radius of the avatar and inner image
   */
  border-radius: var(--border-radius);
}
```
The following table will be generated:

```md
## CSS Custom Properties

| Name              | Description                                 |
| ----------------- | ------------------------------------------- |
| `--border-radius` | Border radius of the avatar and inner image |
```

The styling details section will be placed after the [Shadow Parts Details](#shadow-parts) of the README.

If a component does not include styling details, this section will be omitted from the generated README.

### A Custom Footer

Removing or customizing the footer can be done by adding a `footer` property to
the output target. This string is added to the generated Markdown files without
modification, so you can use Markdown syntax in it for rich formatting:

```tsx title="stencil.config.ts"
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'docs-readme',
      footer: '*Built with love!*',
    }
  ]
};
```

The following footer will be placed at the bottom of your component's README file:
```
*Built with love!*
```

## Configuration
### Specifying the Output Directory

By default, a readme file will be generated in the same directory as the
component it corresponds to. This behavior can be changed by setting the `dir`
property on the output target configuration. Specifying a directory will create
the structure `{dir}/{component}/readme.md`.

```tsx title="stencil.config.ts"
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'docs-readme',
      dir: 'output'
    }
  ]
};
```

### Strict Mode

Adding `strict: true` to the output target configuration will cause Stencil to output a warning whenever the project is built with missing documentation.

```tsx title="stencil.config.ts"
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'docs-readme',
      strict: true
    }
  ]
};
```

When strict mode is enabled, the following items are checked:
1. `@Prop()` usages must be documented, unless the property is marked as `@deprecated`
2. `@Method()` usages must be documented, unless the method is marked as `@deprecated`
3. `@Event()` usages must be documented, unless the event is marked as `@deprecated`
4. CSS Part usages must be documented
