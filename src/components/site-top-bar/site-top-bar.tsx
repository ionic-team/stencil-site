import { Component, h } from '@stencil/core';

@Component({
  tag: 'site-top-bar',
  styleUrl: 'site-top-bar.css'
})
export class SiteTopBar {

  render() {
    return (
      <a href="https://blog.ionicframework.com/build-your-next-design-system-with-web-components/" target="_blank">
        On the blog: <u>Build your next Design System with Web Components</u>
      </a>
    );
  }
}
