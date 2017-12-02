import { Component } from '@stencil/core';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.scss'
})
export class SiteMenu {
  render() {
    return (
      <div>
        <iframe class="star-button" src="https://ghbtns.com/github-btn.html?user=ionic-team&repo=stencil&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
        <ul id="menu-list">
          <li>
            <h4>概要</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/intro">
                  介绍
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/getting-started">
                  现在开始
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/browser-support">
                  浏览器支持
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url='/pwa'>
                  PWAs
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>基础</h4>
            <ul>

              <li>
                <stencil-route-link url="/docs/my-first-component">
                  我的第一个组件
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/templating">
                  使用 JSX
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/decorators">
                  装饰器
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/events">
                  事件
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/component-lifecycle">
                  组件生命周期
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/forms">
                  表单
                </stencil-route-link>
              </li>
              
              <li>
                <stencil-route-link url="/docs/handling-arrays">
                  更新 Arrays 和 Objects
                </stencil-route-link>
              </li>

              <li>
                <stencil-route-link url="/docs/testing">
                  单元测试
                </stencil-route-link>
              </li>

            </ul>
          </li>

          <li>
            <h4>进阶</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/stencil-config">
                  Stencil 配置
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/prerendering">
                  预渲染
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/server-side-rendering">
                  服务端渲染
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/service-workers">
                  Service Workers
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/shadow-dom">
                  Shadow DOM
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/distribution">
                  部署
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link url="/docs/angular-integration">
                  Angular 集成
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>插件(Add-ons)</h4>
            <ul>
              <li>
                <stencil-route-link url="/docs/routing">
                  路由
                </stencil-route-link>
              </li>
            </ul>
          </li>

          <li>
            <h4>社区</h4>
            <ul>
              <li>
                <a href="https://join.slack.com/t/stencil-worldwide/shared_invite/enQtMjYwNjg5NDMzODQwLTdiNWZiNDMyMWRjZTBiMjIzMGFlOTZiZWVkNDVjNzc2ZTI5MzI2Y2VjZDgwYjczMjU3NWIxMDYzMzI2ZjY3NjM" title="Stencil slack channel">Stencil on Slack</a>
              </li>
              <li>
                <a href="https://twitter.com/stenciljs">Stencil on Twitter</a>
              </li>
              <li>
                <a href="https://github.com/ionic-team/stencil">
                  Stencil on GitHub
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
