import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.scss'
})
export class SiteMenu {

  @Event() leftSidebarClick: EventEmitter;
  toggleMenu() {
    this.leftSidebarClick.emit();
  }

  render() {
    return (
      <div>
        <ul class='menu-list'>
          <li>
            <h4>Introduction</h4>
            <ul>
              <li>
                <stencil-route-link url='/docs/intro' onClick={() => this.toggleMenu()}>
                  Why Stencil
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/getting-started' onClick={() => this.toggleMenu()}>
                  Getting Started
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/my-first-component' onClick={() => this.toggleMenu()}>
                  My First Component
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/docs/reusable-components' onClick={() => this.toggleMenu()}>
                  Reusable Components
                </stencil-route-link>
              </li>
              {/*<li>
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
                <stencil-route-link url='/docs/component-lifecycle' onClick={() => this.toggleMenu()}>
                  Component Life Cycle
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/decorators' onClick={() => this.toggleMenu()}>
                  Decorators
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/events' onClick={() => this.toggleMenu()}>
                  Events
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/handling-arrays' onClick={() => this.toggleMenu()}>
                  Reactive Data
                </stencil-route-link>
              </li>

              {/*<li>
                <stencil-route-link url='/docs/templating'>
                  Templating and JSX
                </stencil-route-link>
              </li>*/}

              {/*
                The below route will be replaced with the above route
                once ready
              */}
              <li>
                <stencil-route-link url="/docs/templating" onClick={() => this.toggleMenu()}>
                  Using JSX
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/shadow-dom' onClick={() => this.toggleMenu()}>
                  Styling
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/forms' onClick={() => this.toggleMenu()}>
                  Forms
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/stencil-config' onClick={() => this.toggleMenu()}>
                  Config
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/testing' onClick={() => this.toggleMenu()}>
                  Unit Testing
                </stencil-route-link>
              </li>

            </ul>
          </li>

          <li>
            <h4>Guides</h4>
            <ul>
              <li>
                <stencil-route-link url='/docs/distribution' onClick={() => this.toggleMenu()}>
                  Distribution
                </stencil-route-link>
              </li>

              {/*<li>
                <stencil-route-link url='/docs/module-bundling'>
                  Module Bundling
                </stencil-route-link>
              </li>*/}

              <li>
                <stencil-route-link url='/docs/pre-rendering' onClick={() => this.toggleMenu()}>
                  Prerendering
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/server-side-rendering' onClick={() => this.toggleMenu()}>
                  Server Side Rendering
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/service-workers' onClick={() => this.toggleMenu()}>
                  Service Workers
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/context' onClick={() => this.toggleMenu()}>
                  Context
                </stencil-route-link>
              </li>

              {/*<li>
                <stencil-route-link url='/docs/performance'>
                  Performance
                </stencil-route-link>
              </li>*/}

              <li>
                <stencil-route-link url='/docs/unit-testing' onClick={() => this.toggleMenu()}>
                  Unit Testing
                </stencil-route-link>
              </li>

              {/*<li>
                <stencil-route-link url='/docs/dev-inspector'>
                  Dev Inspector
                </stencil-route-link>
              </li>*/}

              <li>
                <stencil-route-link url='/docs/routing' onClick={() => this.toggleMenu()}>
                  Router
                </stencil-route-link>
              </li>

              {/*
                The below route will be replaced by the framework integration
                section once its ready
              */}
              <li>
                <stencil-route-link url="/docs/framework-integration" onClick={() => this.toggleMenu()}>
                  Framework Integration
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url='/docs/style-guide' onClick={() => this.toggleMenu()}>
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
              <li>
                <stencil-route-link url='/docs/community/how-to-contribute' onClick={() => this.toggleMenu()}>
                  How to Contribute
                </stencil-route-link>
              </li>
              <li>
                <a href='https://github.com/ionic-team/stencil'>
                  Stencil on GitHub
                </a>
              </li>
              <li>
                <a href='https://join.slack.com/t/stencil-worldwide/shared_invite/enQtMjYwNjg5NDMzODQwLTdiNWZiNDMyMWRjZTBiMjIzMGFlOTZiZWVkNDVjNzc2ZTI5MzI2Y2VjZDgwYjczMjU3NWIxMDYzMzI2ZjY3NjM' title='Stencil slack channel'>Stencil on Slack</a>
              </li>
              <li>
                <a href='https://twitter.com/stenciljs'>Stencil on Twitter</a>
              </li>
              <li>
                <stencil-route-link url='/docs/community/add-ons' onClick={() => this.toggleMenu()}>
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
