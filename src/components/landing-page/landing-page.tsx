import { Component, Element } from '@stencil/core';


@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {

  @Element() el: Element;

  constructor() {
    document.title = `Stencil`;
  }

  openYoutube() {
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.add('youtube-show');
    background.classList.add('background-show');
  }

  closeBackground() {
    console.log('hello world');
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.remove('youtube-show');
    background.classList.remove('background-show');
  }

  render() {
    return (
      <div>

        <div onClick={() => { this.closeBackground() }} id="background">
        </div>

        <div id="youtube-video" onClick={() => { this.closeBackground() }}>
          <lazy-iframe src="https://www.youtube.com/embed/UfD-k7aHkQE" title="Ionic team at Polymer Summit video" />
        </div>

        <main>
          <img id="logo" src="/assets/img/logo.png" alt="Stencil Logo"></img>

          <h1 id="action-call">魔法般的，可复用的 web component 编译器</h1>

          <section id="buttons">

            <stencil-route-link url="/docs/getting-started">
              <button id="get-started">
                现在开始
            </button>
            </stencil-route-link>

            <stencil-route-link url="/docs/intro">
              <button id="learn-more">
                了解更多
          </button>
            </stencil-route-link>

            <div onClick={() => { this.openYoutube() }} id="launch-video">
              <img src="/assets/img/video-icon.png" alt="Icon for Video"></img><span>Watch launch video</span>
            </div>

            <a href="https://youtu.be/UfD-k7aHkQE" rel="noopener" id="mobile-video">
              <img src="/assets/img/video-icon.png" alt="Icon for video link"></img><span>Watch launch video</span>
            </a>
          </section>
        </main>

        <section id="three-points">
          <div class="point-card simple">
            <h2>简单</h2>

            <p>
              有意设计的小工具，简洁的 API，零配置，TypeScript 支持，一切就绪。
              </p>
          </div>

          <div class="point-card performant">
            <h2>高效</h2>

            <p>
              gzip压缩后仅6kb的运行时, 服务端渲染,
              发挥Web Components原生潜力。
              </p>
          </div>

          <div class="point-card future-proof">
            <h2>前沿</h2>

            <p>
              基于 100% 的 wweb 标准，构建多种多样的组件。
              打破框架的约束。
              </p>
          </div>
        </section>

      </div>
    );
  }
}
