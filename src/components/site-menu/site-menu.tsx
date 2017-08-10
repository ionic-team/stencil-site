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
            <h4>Intro</h4>
            <ul>
              <li>
                <stencil-route-link url="/what-is-stencil" router="#content-routes" custom={true}>
                  What is stencil
            </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/getting-started" router="#content-routes" custom={true}>
                  Getting Started
                </stencil-route-link>
              </li>
            </ul>
          </li>
          <li>
            <h4>Basics</h4>
            <ul>
              <li>
                <stencil-route-link url="/components" router="#content-routes" custom={true}>
                  Components
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/code-splitting" router="#content-routes" custom={true}>
                  Code Splitting
                </stencil-route-link>
              </li>
            </ul>
            </li>

          <li>
            <h4>Advanced</h4>
            <ul>
              <li>
                <stencil-route-link url="/server-side-rendering" router="#content-routes" custom={true}>
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
