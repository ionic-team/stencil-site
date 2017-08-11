import { Component, Prop, Element } from '@stencil/core';

/**
  * @name Route
  * @module ionic
  * @description
 */
@Component({
  tag: 'stencil-route-link'
})
export class RouteLink {
  @Element() el: HTMLElement;
  @Prop() url: string;
  // The instance of the router
  @Prop() router: any;

  handleClick(e) {
    e.preventDefault();
    console.log('Route link click', e);
    const router = document.querySelector(this.router);
    if (!router) {
      console.warn('<stencil-route-link> wasn\'t passed an instance of the router as the "router" prop!');
      return;
    }

    router.navigateTo(this.url);
  }

  render() {
    return (
      <span onClick={this.handleClick.bind(this)}>
        <slot></slot>
      </span>
    )
  }
}
