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
      { title: 'st-fetch: A simple component for performing http fetch calls', url: 'https://github.com/Fdom92/stencil-fetch' }
      //{ title: '', url: '' }
    ]
  }
  constructor() {
    document.title = `Stencil Resources`;
  }

  render() {
    return (
      <div class="wrapper">
        <div class="pull-left">
          <site-menu />
        </div>

        <div class="pull-right">
          <h1>资源</h1>
          <h4>可以帮助你学到更多关于 Stencil 的资源</h4>

          <div>
            <h2>社区文章/博客</h2>
            <p>
              免责声名：这些文章由社区产出，并且可能包含不精准的，过时的信息和代码片段。
          </p>
            <ul>
              {/* TODO: Turn these into an auto array map to use science to our benefit */}
              <li><a target="_blank" href="https://www.youtube.com/watch?v=UfD-k7aHkQE">Announcing Stencil.js</a></li>
              <li><a target="_blank" href="https://www.youtube.com/watch?v=MqMYaT1GlWY">Stencil - Getting Started (video)</a></li>
              <li><a target="_blank" href="https://github.com/ospatil/ng-components-integration">Using a Stencil-built component in Angular</a></li>
              <li><a target="_blank" href="https://coryrylan.com/blog/create-your-first-web-component-with-stencil-js">Create your First Stencil Component</a></li>
              <li><a target="_blank" href="https://alligator.io/stencil/getting-started/">Getting Started With Stencil</a></li>
              <li><a target="_blank" href="https://medium.com/@sinedied/stencil-js-its-finally-time-for-vanilla-web-components-927d26b573e1">Stencil.js: It's finally time for vanilla web components!</a></li>
              <li><a target="_blank" href="https://github.com/aaronksaunders/stencil-mobx">Stencil with MobX</a></li>
              <li><a target="_blank" href="https://www.datacodedesign.de/webkomponenten-mit-stencil-ein-erster-ueberblick/">Webkomponenten mit Stencil – Ein erster Überblick (in German)</a></li>
              <li><a target="_blank" href="https://medium.com/t%C3%BCrkiye/stencile-giri%C5%9F-41e90e37595d">Stencil’e Giriş (in Turkish)</a></li>
              <li><a target="_blank" href="https://medium.com/t%C3%BCrkiye/stencilde-bilesenler-arasi-haberlesme-52523a470fa9">Stencil’de Bileşenler Arası Haberleşme (in Turkish)</a></li>
            </ul>
          </div>

          <div>
            <h2>第三方组件/模版</h2>
            <ul>
              {this.LINKS.COMPONENTS.map(link => {
                return (<li><a target="_blank" href={link.url}>{link.title}</a></li>);
              })}
              {this.LINKS.TEMPLATES.map(link => {
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
            当你下次和别人见面和介绍Stencil时，可以fork的presentation。
            使用<a href="https://github.com/hakimel/reveal.js">Reveal.js</a>构建。
            </p>
            <a target="_blank" href="https://ionic-team.github.io/stencil-present/">Stencil Presentation</a>
            <br />
            <a target="_blank" href="https://github.com/ionic-team/stencil-present/">源码</a>
          </div>
        </div>
      </div>
    );
  }
}
