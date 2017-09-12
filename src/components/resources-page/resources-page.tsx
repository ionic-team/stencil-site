import { Component } from '@stencil/core';

@Component({
  tag: 'resources-page',
  styleUrl: 'resources-page.scss'
})
export class ResourcesPage {
  constructor() {
    document.title = `Stencil Resources`;
  }

  render() {
    return (
      <div>
        <h1>Resources</h1>
        <h4>Resources to help you get more out of Stencil</h4>
        <div>
        <h2>Present Stencil</h2>
        <div class="slide-wrapper">
          <iframe style={{border: '1px solid #eee'}} src="https://ionic-team.github.io/stencil-present/"></iframe>
        </div>
          <p>
            A forkable presentation for your next meetup or conference
            talk on Stencil.
            Built with <a href="lab.hakim.se/reveal-js/">Reveal.js</a>
          </p>
          <a target="_blank" href="https://ionic-team.github.io/stencil-present/">Stencil Presentation</a>
          <br />
          <a target="_blank" href="https://github.com/ionic-team/stencil-present/">Source</a>
        </div>
        <div>
          <h2>Community Articles/Blogs</h2>
          <p>
            Disclaimer: these articles are community-created, and might contain
            inaccurate, or outdated information and code snippets.
          </p>
          <ul>
            <li><a target="_blank" href="https://www.youtube.com/watch?v=UfD-k7aHkQE">Announcing Stencil.js</a></li>
            <li><a target="_blank" href="https://github.com/ospatil/ng-components-integration">Using a Stencil-built component in Angular</a></li>
            <li><a target="_blank" href="https://coryrylan.com/blog/create-your-first-web-component-with-stencil-js">Create your First Stencil Component</a></li>
            <li><a target="_blank" href="https://alligator.io/stencil/getting-started/">Getting Started With Stencil</a></li>
            <li><a target="_blank" href="https://medium.com/@sinedied/stencil-js-its-finally-time-for-vanilla-web-components-927d26b573e1">Stencil.js: It's finally time for vanilla web components!</a></li>
            <li><a target="_blank" href="https://github.com/aaronksaunders/stencil-mobx">Stencil with MobX</a></li>
            <li><a target="_blank" href="https://www.datacodedesign.de/webkomponenten-mit-stencil-ein-erster-ueberblick/">Webkomponenten mit Stencil – Ein erster Überblick (in German)</a></li>
            <li><a target="_blank" href="https://medium.com/t%C3%BCrkiye/stencile-giri%C5%9F-41e90e37595d">Stencil’e Giriş (in Turkish)</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
