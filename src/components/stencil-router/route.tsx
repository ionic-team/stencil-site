import { Component, Prop, State, h } from '@stencil/core';

/**
  * @name Route
  * @module ionic
  * @description
 */
@Component({
  tag: 'stencil-route'
})
export class Route {
  $el: any;

  @State() routerInstance: any;

  @Prop() url: string;

  @Prop() component: string;

  @Prop() componentProps: any = {};

  // The instance of the router
  @Prop() router: any;

  //@Prop() match: any;
  @State() match: any = {};

  componentWillLoad() {
    const routerElement = document.querySelector(this.router)

    routerElement.addEventListener('stencilRouterLoaded', (e) => {
      console.log('Stencil router loaded', e);
      this.routerInstance = routerElement;
    })

    routerElement.addEventListener('stencilRouterNavigation', (e) => {
      this.match = e.detail;
    })
  }

  render() {
    if(!this.routerInstance) { return null; }

    this.match.url = this.routerInstance.$instance.routeMatch.url;
    const match = this.match
    const ChildComponent = this.component

    console.log('Does match match?', match.url, this.url)

    //return <p></p>;

    if(match.url == this.url) {
      console.log(`  <ion-route> Rendering route ${this.url}`, this.router, match);
      return (<ChildComponent props={this.componentProps} />);
    } else {
      return null;
    }
  }
}
