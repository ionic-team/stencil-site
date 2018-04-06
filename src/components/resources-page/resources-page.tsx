import { Component } from '@stencil/core';

@Component({
  tag: 'resources-page',
  styleUrl: 'resources-page.scss'
})
export class ResourcesPage {
  LINKS = {
    TEMPLATES: [
      { title: 'Official Stencil App Starter Project', url: 'https://github.com/ionic-team/stencil-app-starter' },
      { title: 'Official Stencil Component Starter Project', url: 'https://github.com/ionic-team/stencil-component-starter' },
      { title: 'Stencil Boilerplate with Server Side Rendering', url: 'https://github.com/mitchellsimoens/stencil-boilerplate' },
      { title: 'Angular Stencil: use Stencil-built components in Angular', url: 'https://github.com/seveves/angular-stencil' }
    ],
    COMPONENTS: [
      { title: 'Stencil Card Component', url: 'https://github.com/henriquecustodia/stencil-card-app' },
      { title: 'st-image: lazy loaded images', url: 'https://github.com/jgw96/st-img' },
      { title: 'st-payment: Stencil Payment API Component', url: 'https://github.com/Fdom92/stencil-payment' },
      { title: 'st-fetch: A simple component for performing http fetch calls', url: 'https://github.com/Fdom92/stencil-fetch' },
      { title: 'web-photo-filter: Use webGL for amazing instagram like filters', url: 'https://github.com/peterpeterparker/web-photo-filter' },
      { title: 'stencil-flip-images: Awesome animated image gallery', url: 'https://github.com/jepiqueau/stencil-flip-images'}
    ],
    TOOLS: [
      { title: 'yo Stencil: A yeoman generator for Stencil', url: 'https://github.com/AkashGutha/generator-stencil' },
      { title: 'Stencil Snippets: A Stencil snippets package for VS Code', url: 'https://marketplace.visualstudio.com/items?itemName=fdom.stencil-snippets' }
    ],
    BLOGS: [
      { title: 'Announcing Stencil.js', url: 'https://www.youtube.com/watch?v=UfD-k7aHkQE' },
      { title: 'Stencil - Getting Started (video)', url: "https://www.youtube.com/watch?v=MqMYaT1GlWY" },
      { title: 'Using a Stencil-built component in Angular', url: "https://github.com/ospatil/ng-components-integration" },
      { title: 'Create your First Stencil Component', url: 'https://coryrylan.com/blog/create-your-first-web-component-with-stencil-js' },
      { title: 'Getting Started with Stencil', url: 'https://alligator.io/stencil/getting-started/' },
      { title: "Stencil.js: It's finally time for vanilla web components!", url: 'https://medium.com/@sinedied/stencil-js-its-finally-time-for-vanilla-web-components-927d26b573e1' },
      { title: "Stencil with MobX", url: 'https://github.com/aaronksaunders/stencil-mobx'},
      { title: "Webkomponenten mit Stencil – Ein erster Überblick (in German)", url: 'https://www.datacodedesign.de/webkomponenten-mit-stencil-ein-erster-ueberblick/' },
      { title: 'Stencil’e Giriş (in Turkish)', url: 'https://medium.com/t%C3%BCrkiye/stencile-giri%C5%9F-41e90e37595d' },
      { title: 'Stencil’de Bileşenler Arası Haberleşme (in Turkish)', url: 'https://medium.com/t%C3%BCrkiye/stencilde-bilesenler-arasi-haberlesme-52523a470fa9' }
    ]
  }
  constructor() {
    document.title = `Stencil Resources`;
  }

  render() {
    return (
      <div>
        <h1 class="headline measure-md">Resources to help you get more out of Stencil</h1>

        <div>
          <h2>Community Articles/Blogs</h2>
          <p>
            Disclaimer: these articles are community-created, and might contain
          inaccurate, or outdated information and code snippets.
        </p>
          <ul>
            {
              this.LINKS.BLOGS.map(link => {
                return (<li><a target="_blank" href={link.url}>{link.title}</a></li>);
              })
            }
          </ul>
        </div>

        <div>
          <h2>Third-party Components, Templates and Tools</h2>
          <ul>
            {this.LINKS.COMPONENTS.map(link => {
              return (<li><a target="_blank" href={link.url}>{link.title}</a></li>);
            })}
            {this.LINKS.TEMPLATES.map(link => {
              return (<li><a target="_blank" href={link.url}>{link.title}</a></li>);
            })}
            {this.LINKS.TOOLS.map(link => {
              return (<li><a target="_blank" href={link.url}>{link.title}</a></li>);
            })}
          </ul>
        </div>

        <div>
          <h2>Present Stencil</h2>
          <div class="slide-wrapper">
            <lazy-iframe style={{ border: '1px solid #eee' }} src="https://ionic-team.github.io/stencil-present/" title="Present Stencil"></lazy-iframe>
          </div>
          <p>
            A forkable presentation for your next meetup or conference
          talk on Stencil.
          Built with <a href="https://github.com/hakimel/reveal.js">Reveal.js</a>
          </p>
          <a target="_blank" href="https://ionic-team.github.io/stencil-present/">Stencil Presentation</a>
          <br />
          <a target="_blank" href="https://github.com/ionic-team/stencil-present/">Source</a>
        </div>
      </div>
    );
  }
}
