---
title: Screenshot Visual Diff
description: Screenshot Visual Diff
url: /docs/screenshot-visual-diff
contributors:
  - adamdbradley
---

# Screenshot Visual Diff

`EXPERIMENTAL`: screenshot visual diff testing is currently under heavy development and has not reached a stable status. However, any assistance testing would be appreciated.

```bash
stencil test --e2e --screenshot
```

[pupeteer](https://github.com/GoogleChrome/puppeteer) is used to compare screenshots. In order to make one, you have to set up an e2e test, e.g.:
```
  it('render something', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent(`<my-cmp></my-cmp`);
    await page.compareScreenshot('My Componment (...is beautiful. Look at it!)', {fullPage: false});
  });
```
