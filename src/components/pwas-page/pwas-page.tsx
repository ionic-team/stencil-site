import { Component } from '@stencil/core';

@Component({
  tag: 'pwas-page',
  styleUrl: 'pwas-page.scss'
})
export class pwasPage {

  constructor() {
    document.title = `PWAs`;
  }

  render() {
    return (
      <div class="wrapper">
        <div class="pull-left">
          <site-menu />
        </div>

        <div class="pull-right">
          <h1>PWAs</h1>
          <h4>用 Stencil 构建 PWAs</h4>

          <p>想要使用 Stencil 构建 PWAs？ 遵循下边的说明立刻获得一个可用于生产环境部署的PWA。</p>

          <ul>
            <li>
              在你的终端里运行 <code>git clone https://github.com/ionic-team/stencil-app-starter.git my-pwa</code>.
          </li>
            <li>
              运行 <code>npm run build</code>
            </li>
          </ul>

          这两条命令可以让你的 PWA 在 lighthouse 中达到100分。

        <img src="/assets/img/pwa.png"></img>

          <h4>幕后发生了什么</h4>

          <h5>Service Worker</h5>
          <p>
            当你运行 <code>npm run build</code> 时，我们使用 <a href="https://workboxjs.org/">Workbox</a> 自动为你生成了可以预缓存资源的Service Worker。
        </p>

          <stencil-route-link url="/docs/service-workers">
            阅读更多关于 Service Workers 的资源。
        </stencil-route-link>

          <h5>Web Manifest</h5>
          <p>
            默认地，我们会包含一份 Web Manifest，其中有所有需要的入口，和“添加到桌面”的弹窗提示。
            在<a href="https://github.com/ionic-team/stencil-app-starter/blob/master/src/manifest.json">这里</a>你可以查看这些web manifest。
        </p>

          <h4>使用 Stencil 构建的 PWAs</h4>

          <ul>
            <li>
              <a href="https://stenciljs.com/">这个网站! 对 stenciljs.com 就是使用了 PWA（译者注：stenciljs.com 是原文档地址，此中文翻译文档同样使用了PWA）</a>
            </li>
            <li>
              <a href="https://corehacker-10883.firebaseapp.com/">Ionic HN as featured on <a href="https://hnpwa.com">HNPWA</a></a>
            </li>
            <li>
              <a href="https://stencilpaint-8ba3c.firebaseapp.com/">StencilPaint</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
