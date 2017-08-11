import { Component, Prop, State, Element } from '@stencil/core';

/**
  * @name Route
  * @module ionic
  * @description
 */
@Component({
  tag: 'stencil-route'
})
export class Route {
  @Element() el: any;

  @State() routerInstance: any;

  @Prop() url: string;

  @Prop() component: string;

  @Prop() componentProps: any = {};

  @Prop() exact: boolean = false;

  // The instance of the router
  @Prop() router: any;

  //@Prop() match: any;
  @State() match: any = {};

  componentWillLoad() {
    setTimeout(() => {
      const routerElement = document.querySelector(this.router);

      if (routerElement) {
        setTimeout(() => {
          this.routerInstance = routerElement;
        })
      }

      routerElement.addEventListener('stencilRouterLoaded', (e) => {
        console.log('got fired');
        // this.routerInstance = this.el
        // this.routerInstance = routerElement.$instance;
      })

      routerElement.addEventListener('stencilRouterNavigation', (e) => {
        console.log('i got fired', e.detail);
        //console.log(`<stencil-route> for ${this.path} got nav event`, e.detail);
        this.match = e.detail;
      })
    })
    /*const routerElement = document.querySelector(this.router)
    console.log(routerElement);*/
  }

  render() {
    if (!this.routerInstance) {
      return null;
    }

    //console.log(`<stencil-route> for ${this.path} rendering`);
    this.match.url = this.routerInstance.match().url;
    const match = this.match;
    const ChildComponent = this.component;

    const cleanedUrl = this.url.split('/').join().replace(/ /g, '');
    const cleanedMatchUrl = match.url.split('/').join().replace(/ /g, '');

    // Check if this route is in the matching URL (for example, a parent route)
    const isInPath = cleanedMatchUrl.indexOf(cleanedUrl) === 0;

    const matches = this.exact ? cleanedMatchUrl === cleanedUrl : isInPath;

    // const matches = match.url === this.url;

    // console.log(`\tDoes ${match.url} match our path ${this.url}?`, matches)

    if (matches) {
      // console.log('childComponent', ChildComponent);
      // console.log(`  <ion-route> Rendering route ${this.url}`, this.router, match);
      return (<ChildComponent props={this.componentProps} />);
    } else {
      return <span></span>;
    }
  }
}
