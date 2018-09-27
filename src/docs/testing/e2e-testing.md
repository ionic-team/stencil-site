---
title: End-to-end Testing
description: End-to-end Testing
url: /docs/end-to-end-testing
contributors:
  - adamdbradley
---

# End-to-end Testing

Stencil provides many utility functions to help test [Jest](https://jestjs.io/) and [Puppeteer](https://pptr.dev/). For example, a component's shadow dom can be queried and tested with the Stencil utility functions built on top of Puppeteer. Tests can not only be provided mock HTML content, but they can also go to URLs of your app which Puppeteer is able to open up and test on Stencil's dev server.

End-to-end tests require a fresh build, dev-server, and puppeteer browser instance created before the tests can actually run. With the added build complexities, the `stencil test` command is able to organize the build requirements beforehand.


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
