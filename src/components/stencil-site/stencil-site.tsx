import { Component } from '@stencil/core';

@Component({
  tag: 'stencil-site',
  styleUrl: 'stencil-site.scss'
})
export class App {
  render() {
    return (
      <div class="app">
        <site-header />
        <div class="wrapper">
          <div class="pull-left">
            <site-menu />
          </div>
          <div class="pull-right">
            <stencil-router>

              <stencil-route
                url="/"
                component="landing-page"
                exact={true}
              />

              <stencil-route
                url="/demos"
                component="demos-page"
              />

              <stencil-route
                url="/docs/:pageName"
                routeRender={( props: { [key: string]: any}) => {
                  const map = {
                    'intro': 'intro/index.html',
                    'getting-started': 'start/index.html',
                    'my-first-component': 'basics/my-first-component.html',
                    'templating': 'basics/templating.html',
                    'decorators': 'basics/decorators.html',
                    'events': 'basics/events.html',
                    'component-lifecycle': 'basics/component-lifecycle.html',
                    'stencil-config': 'basics/stencil-config.html',
                    'config': 'compiler/config.html',
                    'server-side-rendering': 'advanced/ssr/index.html',
                    'routing': 'addons/stencil-router.html',
                    'service-workers': 'advanced/service-worker/index.html',
                    'distribution': 'advanced/distribution/index.html',
                    'prerendering': 'advanced/pre-rendering/index.html'
                  };
                  return (
                    <document-component pages={[map[props.match.params.pageName]]} />
                  );
                }}
              />

              <stencil-route
                url="/resources"
                component="resources-page"
              />

            </stencil-router>
          </div>
        </div>
      </div>
    );
  }
}
