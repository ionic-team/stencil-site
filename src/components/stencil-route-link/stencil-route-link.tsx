import { Component, Prop } from '@stencil/core';

/**
  * @name Route
  * @module ionic
  * @description
 */
@Component({
  tag: 'stencil-route-link'
})
export class RouteLink {
  @Prop() url: string;

  @Prop() custom: boolean = false;

  // The instance of the router
  @Prop() router: any;

  handleClick(e) {
    e.preventDefault();
    
    console.log('Route link click', e);
    const router = document.querySelector(this.router);
    if(!router) {
      console.warn('<stencil-route-link> wasn\'t passed an instance of the router as the "router" prop!');
      return;
    }

    router.navigateTo(this.url);
  }

  render() {
    if(this.custom) {
      return (
        <span onClick={this.handleClick.bind(this)}>
          <slot></slot>
        </span>
      );
    } else {
      return (
        <a href={this.url} onClick={this.handleClick.bind(this)}>
          <slot></slot>
        </a>
      )
    }
  }
}