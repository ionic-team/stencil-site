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
              <stencil-route-link url="/docs/intro" router="#router" custom="true" > What is Stencil </stencil-route-link>
              </li>
              <li>
              <stencil-route-link url="/docs/getting-started" router="#router" custom="true" >
                  Getting Started
                </stencil-route-link>
              </li>
            </ul>
          </li>
          <li>
            <h4>Basics</h4>
            <ul>
              <li>
                <stencil-route-link url="/components" router="#router"  custom="true">
                  Components
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/code-splitting" router="#router"  custom="true">
                  Code Splitting
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>Advanced</h4>
            <ul>
              <li>
                <stencil-route-link url="/server-side-rendering" router="#router"  custom="true">
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
