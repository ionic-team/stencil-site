import { Component } from '@stencil/core';
import SiteProviderConsumer from '../../global/site-provider-consumer';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.scss'
})
export class SiteMenu {
  render() {
    return (
      <SiteProviderConsumer.Consumer>
      {({ toggleLeftSidebar }) => (
        <div>
          <ul class='menu-list'>
            <li>
              <h4>Introduction</h4>
              <ul>
                <li>
                  <stencil-route-link url='/docs/introduction' onClick={() => toggleLeftSidebar()}>
                    Why Stencil
                  </stencil-route-link>
                </li>
                <li>
                  <stencil-route-link url='/docs/getting-started' onClick={() => toggleLeftSidebar()}>
                    Getting Started
                  </stencil-route-link>
                </li>
                <li>
                  <stencil-route-link url='/docs/my-first-component' onClick={() => toggleLeftSidebar()}>
                    My First Component
                  </stencil-route-link>
                </li>
                {/*<li>
                  <stencil-route-link url='/docs/reusable-components' onClick={() => toggleLeftSidebar()}>
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
                </li>*/}
              </ul>
            </li>

            <li>
              <h4>Reference</h4>
              <ul>

                <li>
                  <stencil-route-link url='/docs/component-lifecycle' onClick={() => toggleLeftSidebar()}>
                    Component Life Cycle
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/decorators' onClick={() => toggleLeftSidebar()}>
                    Decorators
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/events' onClick={() => toggleLeftSidebar()}>
                    Events
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/reactive-data' onClick={() => toggleLeftSidebar()}>
                    Reactive Data
                  </stencil-route-link>
                </li>

                {/*<li>
                  <stencil-route-link url='/docs/templating-jsx'>
                    Templating and JSX
                  </stencil-route-link>
                </li>*/}

                {/*
                  The below route will be replaced with the above route
                  once ready
                */}
                <li>
                  <stencil-route-link url="/docs/templating-jsx" onClick={() => toggleLeftSidebar()}>
                    Using JSX
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/styling' onClick={() => toggleLeftSidebar()}>
                    Styling
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/forms' onClick={() => toggleLeftSidebar()}>
                    Forms
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/config' onClick={() => toggleLeftSidebar()}>
                    Config
                  </stencil-route-link>
                </li>

              </ul>
            </li>

            <li>
              <h4>Guides</h4>
              <ul>
                <li>
                  <stencil-route-link url='/docs/distribution' onClick={() => toggleLeftSidebar()}>
                    Distribution
                  </stencil-route-link>
                </li>

                {/*<li>
                  <stencil-route-link url='/docs/module-bundling'>
                    Module Bundling
                  </stencil-route-link>
                </li>*/}

                <li>
                  <stencil-route-link url='/docs/prerendering' onClick={() => toggleLeftSidebar()}>
                    Prerendering
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/server-side-rendering' onClick={() => toggleLeftSidebar()}>
                    Server Side Rendering
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/service-workers' onClick={() => toggleLeftSidebar()}>
                    Service Workers
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/context' onClick={() => toggleLeftSidebar()}>
                    Context
                  </stencil-route-link>
                </li>

                {/*<li>
                  <stencil-route-link url='/docs/performance'>
                    Performance
                  </stencil-route-link>
                </li>*/}

                <li>
                  <stencil-route-link url='/docs/unit-testing' onClick={() => toggleLeftSidebar()}>
                    Unit Testing
                  </stencil-route-link>
                </li>

                {/*<li>
                  <stencil-route-link url='/docs/dev-inspector'>
                    Dev Inspector
                  </stencil-route-link>
                </li>*/}

                <li>
                  <stencil-route-link url='/docs/router' onClick={() => toggleLeftSidebar()}>
                    Router
                  </stencil-route-link>
                </li>

                {/*
                  The below route will be replaced by the framework integration
                  section once its ready
                */}
                <li>
                  <stencil-route-link url="/docs/framework-integration" onClick={() => toggleLeftSidebar()}>
                    Framework Integration
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/style-guide' onClick={() => toggleLeftSidebar()}>
                    Style Guide
                  </stencil-route-link>
                </li>
              </ul>
            </li>

            {/*<li>
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
            </li>*/}

            <li>
              <h4>Community</h4>
              <ul>
                {/* <li>
                  <stencil-route-link url='/docs/community/how-to-contribute' onClick={() => toggleLeftSidebar()}>
                    How to Contribute
                  </stencil-route-link>
                </li> */}
                <li>
                  <a href='https://github.com/ionic-team/stencil'>Stencil on GitHub</a>
                </li>
                <li>
                  <a href='https://join.slack.com/t/stencil-worldwide/shared_invite/enQtMjYwNjg5NDMzODQwLTdiNWZiNDMyMWRjZTBiMjIzMGFlOTZiZWVkNDVjNzc2ZTI5MzI2Y2VjZDgwYjczMjU3NWIxMDYzMzI2ZjY3NjM' title='Stencil slack channel'>Stencil on Slack</a>
                </li>
                <li>
                  <a href='https://twitter.com/stenciljs'>Stencil on Twitter</a>
                </li>
                <li>
                  <stencil-route-link url='/docs/add-ons' onClick={() => toggleLeftSidebar()}>
                    Add-ons
                  </stencil-route-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}
      </SiteProviderConsumer.Consumer>
    );
  }
}
