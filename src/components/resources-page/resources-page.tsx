import { Component, h } from '@stencil/core';

@Component({
  tag: 'resources-page',
  styleUrl: 'resources-page.css'
})
export class ResourcesPage {

  LINKS = {
    TEMPLATES: [
      { title: 'Official Stencil App Starter Project', url: 'https://github.com/ionic-team/stencil-app-starter' },
      { title: 'Official Stencil Component Starter Project', url: 'https://github.com/ionic-team/stencil-component-starter' },
      { title: 'Angular Stencil: use Stencil-built components in Angular', url: 'https://github.com/seveves/angular-stencil' }
    ],
    COMPONENTS: [
      { title: 'Stencil Router', url: 'https://github.com/ionic-team/stencil-router/wiki'},
      { title: 'Stencil Card Component', url: 'https://github.com/henriquecustodia/stencil-card-app' },
      { title: 'st-image: lazy loaded images', url: 'https://github.com/jgw96/st-img' },
      { title: 'st-payment: Stencil Payment API Component', url: 'https://github.com/Fdom92/stencil-payment' },
      { title: 'st-fetch: A simple component for performing http fetch calls', url: 'https://github.com/Fdom92/stencil-fetch' },
      { title: 'web-photo-filter: Use webGL for amazing instagram like filters', url: 'https://github.com/peterpeterparker/web-photo-filter' },
      { title: 'stencil-flip-images: Awesome animated image gallery', url: 'https://github.com/jepiqueau/stencil-flip-images'},
      { title: 'd3-stencil: Charts built with D3 and Stencil. Framework-agnostic, simple.', url: 'https://d3-stencil.dev'}
    ],
    TOOLS: [
      { title: 'yo Stencil: A yeoman generator for Stencil', url: 'https://github.com/AkashGutha/generator-stencil' },
      { title: 'Stencil Snippets: A Stencil snippets package for VS Code', url: 'https://marketplace.visualstudio.com/items?itemName=fdom.stencil-snippets' },
      { title: 'tslint-stencil: TSLint rules for Stencil components', url: 'https://www.npmjs.com/package/tslint-stencil' }
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
      { title: 'Stencil’de Bileşenler Arası Haberleşme (in Turkish)', url: 'https://medium.com/t%C3%BCrkiye/stencilde-bilesenler-arasi-haberlesme-52523a470fa9' },
      { title: 'Stencil Tricks - A collection of community-written articles on how to do awesome things in Stencil JS', url: 'https://medium.com/stencil-tricks' }
    ],
    DEMOS: [
      {
        title: 'Stenciljs.com',
        description: 'Yep, this site is also built with Stencil!',
        imgPath: '/assets/img/demos/demo-stenciljs',
        demoUrl: '/',
        sourceUrl: 'https://github.com/ionic-team/stencil-site',
      },
      {
        title: 'IonicHN',
        description: 'Hacker News PWA built with @stencil/core and @ionic/core',
        imgPath: '/assets/img/demos/demo-ionichn',
        demoUrl: 'https://corehacker-10883.firebaseapp.com/',
        sourceUrl: 'https://github.com/ionic-team/ionic-stencil-hn-app'
      },
      {
        title: 'Stencil Fiber demo',
        description: 'This showcases the runtime performance of stencil using our async rendering',
        imgPath: '/assets/img/demos/demo-fiber',
        demoUrl: 'https://stencil-fiber-demo.firebaseapp.com/',
        sourceUrl: 'https://github.com/ionic-team/stencil-fiber-demo'
      },
      {
        title: 'IonicBeer',
        description: 'Beer PWA built with @stencil/core and @ionic/core',
        imgPath: '/assets/img/demos/demo-ionicbeer',
        demoUrl: 'https://stencilbeer.firebaseapp.com/',
        sourceUrl: 'https://github.com/jgw96/stencil-beer'
      },
      {
        title: 'InstaMusic',
        description: 'A full featured music player built with @stencil/core and @ionic/core',
        imgPath: '/assets/img/demos/demo-instamusic',
        demoUrl: 'https://instamusic-c15fe.firebaseapp.com/',
        sourceUrl: 'https://github.com/jgw96/instamusic'
      }
    ]
  }

  constructor() {
    document.title = `Stencil Resources`;
  }

  render() {
    return (
      <div class="container">
        <h1 class="headline measure-md">Resources to help you get more out of Stencil</h1>

        <section class="measure-lg">
          <h2>Community Articles/Blogs</h2>
          <p>
            Disclaimer: these articles are community-created, and might contain inaccurate, or outdated information and code snippets.
          </p>
          <ul class="list--unstyled">
            {
              this.LINKS.BLOGS.map(link => {
                return (<li><a target="_blank" rel="noopener" href={link.url}>{link.title}</a></li>);
              })
            }
          </ul>
        </section>

        <section class="measure-lg">
          <h2>3rd Party Components, Templates and Tools</h2>
          <ul class="list--unstyled">
            {this.LINKS.COMPONENTS.map(link => {
              return (<li><a target="_blank" rel="noopener" href={link.url}>{link.title}</a></li>);
            })}
            {this.LINKS.TEMPLATES.map(link => {
              return (<li><a target="_blank" rel="noopener" href={link.url}>{link.title}</a></li>);
            })}
            {this.LINKS.TOOLS.map(link => {
              return (<li><a target="_blank" rel="noopener" href={link.url}>{link.title}</a></li>);
            })}
          </ul>
        </section>

        <section>
          <h2>Demos</h2>
          <p>
            Demos of apps built using Stencil and Ionic
          </p>
          <div class="demo-card-list">
            {this.LINKS.DEMOS.map(demo => {
              return (
                <demo-card
                  name={demo.title}
                  description={demo.description}
                  imgPath={demo.imgPath}
                  demoUrl={demo.demoUrl}
                  sourceUrl={demo.sourceUrl}></demo-card>
              );
            })}
          </div>
        </section>

        <section class="measure-lg">
          <h2>Present Stencil</h2>
          <div class="slide-wrapper screenshot">
            <iframe src="https://ionic-team.github.io/stencil-present/" title="Present Stencil" loading="lazy"></iframe>
          </div>
          <p>
            A forkable presentation for your next meetup or conference
          talk on Stencil.
          Built with <a href="https://github.com/hakimel/reveal.js">Reveal.js</a>
          </p>
          <a target="_blank" rel="noopener" href="https://ionic-team.github.io/stencil-present/">Stencil Presentation</a>
          <br />
          <a target="_blank" rel="noopener" href="https://github.com/ionic-team/stencil-present/">Source</a>
        </section>
      </div>
    );
  }
}
