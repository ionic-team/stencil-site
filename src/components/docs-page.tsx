import { Component } from '@stencil/core';


@Component({
  tag: 'docs-page',
  styleUrl: 'docs-page.scss'
})
export class DocsPage {
  menu = [
    {
      title: '',
      url: '',
      items: [
        { title: 'What is Stencil?', url: '/what-is-stencil' },
        { title: 'Getting Started', url: '/getting-started' },
      ]
    },
    {
      title: 'Advanced',
      url: '/advanced',
      items: [
        { title: 'Server Side Rendering', url: '/server-side-rendering' },
      ]
    },
    {
      title: 'API',
      url: '/api',
      items: []
    }
  ];

  render() {
    console.log('Rendering docs page')
    return (
      <ion-grid>
        <ion-row>
          <ion-col>
            <h2>Documentation</h2>
            <ul>
              {this.menu.map(s => {
                return (
                <li class="section"><stencil-route-link url={`/docs${s.url}`} router="#router" class="section-title">{s.title}</stencil-route-link>
                  <ul>
                    {s.items.map(i => {
                      return (
                        <li><stencil-route-link url={`/docs${s.url}${i.url}`} router="#router">{i.title}</stencil-route-link></li>
                      )
                    })}
                  </ul>
                </li>
                )
              })}
            </ul>
          </ion-col>
          <ion-col col-9>
            <stencil-route path="/docs/getting-started" component="getting-started" router="#router" />
          </ion-col>
        </ion-row>
      </ion-grid>
    )
  }
}
