import { Component, State } from '@stencil/core';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.scss'
})
export class SiteMenu {

  @State() version: string = 'Loading...';

  componentDidLoad() {
    fetch('https://unpkg.com/@stencil/core/package.json').then((res) => {
      return res.json()
    }).then((data) => {
      this.version = data.version;
    })
  }

  render() {
    return (
      <div>
        <div id='version'>v{this.version}</div>

        <lazy-iframe class="star-button" src="https://ghbtns.com/github-btn.html?user=ionic-team&repo=stencil&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></lazy-iframe>
        <ul id="menu-list">
          <li>
            <h4>Introduction</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/intro">
                  Why Stencil
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/getting-started">
                  Getting Started
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/my-first-component">
                  My First Component
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/reusable-components'>
                  Reusable Components
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/building-an-app'>
                  Building an App
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/faq'>
                  FAQ
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>Reference</h4>
            <ul>

              <li>
                <stencil-route-link url="/docs/component-lifecycle">
                  Component Life Cycle
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/decorators">
                  Decorators
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/events">
                  Events
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/handling-arrays">
                  Reactive Data
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/templating">
                  Templating and JSX
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/shadow-dom">
                  Styling
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/forms">
                  Forms
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/stencil-config">
                  Config
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/testing">
                  Unit Testing
                </stencil-route-link>
              </li>

            </ul>
          </li>

          <li>
            <h4>Guides</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/distribution">
                  Distribution
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/module-bundling'>
                  Module Bundling
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/prerendering">
                  Prerendering
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/server-side-rendering">
                  Server Side Rendering
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/service-workers">
                  Service Workers
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/context">
                  Context
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/performance'>
                  Performance
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/unit-testing'>
                  Unit Testing
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/dev-inspector'>
                  Dev Inspector
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/routing">
                  Router
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/style-guide'>
                  Style Guide
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>Framework Integration</h4>
            <ul>
              <li>
                <stencil-route-link url='/docs/framework-integration/vanilla'>
                  Vanilla
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/framework-integration/angular'>
                  Angular
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/framework-integration/react'>
                  React
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/framework-integration/vue'>
                  Vue
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>Community</h4>
            <ul>
              <li>
                <stencil-route-link url='/docs/community/how-to-contribute'>
                  How to Contribute
                </stencil-route-link>
              </li>
              <li>
                <a href="https://github.com/ionic-team/stencil">
                  Stencil on GitHub
                </a>
              </li>
              <li>
                <a href="https://join.slack.com/t/stencil-worldwide/shared_invite/enQtMjYwNjg5NDMzODQwLTdiNWZiNDMyMWRjZTBiMjIzMGFlOTZiZWVkNDVjNzc2ZTI5MzI2Y2VjZDgwYjczMjU3NWIxMDYzMzI2ZjY3NjM" title="Stencil slack channel">Stencil on Slack</a>
              </li>
              <li>
                <a href="https://twitter.com/stenciljs">Stencil on Twitter</a>
              </li>
              <li>
                <stencil-route-link url='/docs/community/add-ons'>
                  Add-ons
                </stencil-route-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
