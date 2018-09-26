import { Component } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.css'
})
export class SiteMenu {
  render() {
    return (
      <SiteProviderConsumer.Consumer>
      {({ toggleLeftSidebar }: SiteState) => (
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
                  <stencil-route-link url='/docs/goals-and-objectives' onClick={() => toggleLeftSidebar()}>
                    Goals and Objectives
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/browser-support' onClick={() => toggleLeftSidebar()}>
                    Browser Support
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

              </ul>
            </li>

            <li>
              <h4>Components</h4>
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

              </ul>
            </li>

            <li>
              <h4>Framework Integrations</h4>
              <ul>

                <li>
                  <stencil-route-link url="/docs/framework-integration" onClick={() => toggleLeftSidebar()}>
                    Overview
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/angular' onClick={() => toggleLeftSidebar()}>
                    Angular
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/react' onClick={() => toggleLeftSidebar()}>
                    React
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/vue' onClick={() => toggleLeftSidebar()}>
                    Vue
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/ember' onClick={() => toggleLeftSidebar()}>
                    Ember
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/javascript' onClick={() => toggleLeftSidebar()}>
                    JavaScript
                  </stencil-route-link>
                </li>

              </ul>
            </li>

            <li>
              <h4>Tooling</h4>
              <ul>

                <li>
                  <stencil-route-link url='/docs/config' onClick={() => toggleLeftSidebar()}>
                    Config
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/dev-server' onClick={() => toggleLeftSidebar()}>
                    Dev Server
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/hot-module-replacement' onClick={() => toggleLeftSidebar()}>
                    Hot Module Replacement
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/prerendering' onClick={() => toggleLeftSidebar()}>
                    Prerendering
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/typed-components' onClick={() => toggleLeftSidebar()}>
                    Typed Components
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/docs-auto-generation' onClick={() => toggleLeftSidebar()}>
                    Docs Auto-Generation
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/build-conditionals' onClick={() => toggleLeftSidebar()}>
                    Build Conditionals
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/plugins' onClick={() => toggleLeftSidebar()}>
                    Plugins
                  </stencil-route-link>
                </li>

              </ul>
            </li>

            <li>
              <h4>Guides</h4>
              <ul>

                <li>
                  <stencil-route-link url='/docs/service-workers' onClick={() => toggleLeftSidebar()}>
                    Service Workers
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/distribution' onClick={() => toggleLeftSidebar()}>
                    Sharing and Distribution
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/module-bundling' onClick={() => toggleLeftSidebar()}>
                    Module Bundling
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/router' onClick={() => toggleLeftSidebar()}>
                    Router
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/state-tunnel' onClick={() => toggleLeftSidebar()}>
                    State Tunnel
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/redux' onClick={() => toggleLeftSidebar()}>
                    Redux
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/style-guide' onClick={() => toggleLeftSidebar()}>
                    Style Guide
                  </stencil-route-link>
                </li>

              </ul>
            </li>

            <li>
              <h4>Testing</h4>
              <ul>

                <li>
                  <stencil-route-link url='/docs/testing' onClick={() => toggleLeftSidebar()}>
                    Overview
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/unit-testing' onClick={() => toggleLeftSidebar()}>
                    Unit Testing
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/e2e-testing' onClick={() => toggleLeftSidebar()}>
                    End-to-end Testing
                  </stencil-route-link>
                </li>

                <li>
                  <stencil-route-link url='/docs/screenshot-visual-diff' onClick={() => toggleLeftSidebar()}>
                    Screenshot Visual Diff
                  </stencil-route-link>
                </li>

              </ul>
            </li>

            <li>
              <h4>Community</h4>
              <ul>
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
                  <stencil-route-link url='/docs/resources' onClick={() => toggleLeftSidebar()}>
                    Resources
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
