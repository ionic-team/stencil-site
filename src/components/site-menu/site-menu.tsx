import { Component, State } from '@stencil/core';

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
                <stencil-route-link url="/what-is-stencil" router="#router" > What is stencil </stencil-route-link>
              </li>
              <li>
              <stencil-route-link url="/docs/getting-started" router="#router" >
                  Getting Started
                </stencil-route-link>
              </li>
            </ul>
          </li>
          <li>
            <h4>Basics</h4>
            <ul>
              <li>
                <stencil-route-link url="/components" router="#router" >
                  Components
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/code-splitting" router="#router" >
                  Code Splitting
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>Advanced</h4>
            <ul>
              <li>
                <stencil-route-link url="/server-side-rendering" router="#router" >
                  Server Side Rendering
                </stencil-route-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
