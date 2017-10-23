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
        <ul>
          <li>
            <h4>Introduction</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/intro">
                  What is Stencil?
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
                  Shadow Dom
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/distribution">
                  Distribution
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
                <a href="https://join.slack.com/t/stencil-worldwide/shared_invite/enQtMjQ2MzkyMTY0MTk0LTQ4ODgzYjFjNjdkNDY3YWVhMmNlMTljMWQxNTM3Yjg0ZTIyZTM1MmU2YWE5YzNjNzE1MmQ3ZTk2NjQ1YzM5ZDM" title="Stencil slack channel">Stencil Slack</a>
              </li>
              <li>
                <a href="https://twitter.com/stenciljs">Stencil on Twitter</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
