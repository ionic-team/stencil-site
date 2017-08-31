import { Component } from '@stencil/core';


@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.scss'
})
export class SiteMenu {
  render() {
    return (
      <div>
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
            </ul>
          </li>

          <li>
            <h4>Component Basics</h4>
            <ul>

              <li>
                <stencil-route-link url="/docs/my-first-component">
                  My First Stencil Component
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/learning-jsx">
                  Learning JSX
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/building-components">
                  Building Components
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/using-events">
                  Using Events
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/component-lifecycle">
                  Component Life Cycle
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/stencil-config">
                  Stencil Configuration
                </stencil-route-link>
              </li>

            </ul>
          </li>

          <li>
            <h4>Advanced</h4>
            <ul>
              <li>
              <stencil-route-link url="/docs/server-side-rendering">
                  Server Side Rendering
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
        </ul>
      </div>
    );
  }
}
