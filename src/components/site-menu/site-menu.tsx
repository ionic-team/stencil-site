import { Component } from '@stencil/core';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.scss'
})
export class SiteMenu {
  render() {
    return (
      <div>
        <iframe class="star-button" src="https://ghbtns.com/github-btn.html?user=ionic-team&repo=stencil&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
        <ul id="menu-list">
          <li>
            <h4>Essentials</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/intro">
                  Introduction
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/getting-started">
                  Getting Started
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/browser-support">
                  Browser Support
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/pwa'>
                  PWAs
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>Basics</h4>
            <ul>

              <li>
                <stencil-route-link url="/docs/my-first-component">
                  My First Component
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/templating">
                  Using JSX
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
                <stencil-route-link url="/docs/component-lifecycle">
                  Component Life Cycle
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/forms">
                  Forms
                </stencil-route-link>
              </li>
              
              <li>
                <stencil-route-link url="/docs/handling-arrays">
                  Updating Arrays and Objects
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
            <h4>Advanced</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/stencil-config">
                  Stencil Configuration
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
                <stencil-route-link url="/docs/shadow-dom">
                  Shadow DOM
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/distribution">
                  Distribution
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/framework-integration">
                  Framework Integration
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>Add-ons</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/routing">
                  Router
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>Community</h4>
            <ul>
              <li>
                <a href="https://join.slack.com/t/stencil-worldwide/shared_invite/enQtMjYwNjg5NDMzODQwLTdiNWZiNDMyMWRjZTBiMjIzMGFlOTZiZWVkNDVjNzc2ZTI5MzI2Y2VjZDgwYjczMjU3NWIxMDYzMzI2ZjY3NjM" title="Stencil slack channel">Stencil on Slack</a>
              </li>
              <li>
                <a href="https://twitter.com/stenciljs">Stencil on Twitter</a>
              </li>
              <li>
                <a href="https://github.com/ionic-team/stencil">
                  Stencil on GitHub
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
