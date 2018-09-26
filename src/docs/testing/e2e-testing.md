---
title: End-to-end Testing
description: End-to-end Testing
contributors:
  - adamdbradley
---

# End-to-end Testing

Stencil provides many utility functions to help test Jest and Puppeteer. For example, a component's shadow dom can be queried and tested with the Stencil utility functions built on top of Puppeteer. Tests can not only be provided mock HTML content, but they can also go to URLs of your app which Puppeteer is able to open up and test on Stencil's dev server.

End-to-end tests require a fresh build, dev-server, and puppeteer browser instance created before the tests can actually run. With the added build complexities, the `stencil test` command is able to organize the build requirements beforehand.


<stencil-route-link url="/docs/unit-testing" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/screenshot-visual-diff" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
