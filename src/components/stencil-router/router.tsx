import { Component, h, Prop, State } from '@stencil/core';

/**
  * @name Router
  * @module ionic
  * @description
 */
@Component({
  tag: 'stencil-router'
})
export class Router {
  $el: any;

  base: string;

  @Prop() root: string = '';

  @State() routeMatch: any = {};

  @Prop()
  get match() {
    return this.routeMatch
  }

  @Prop()
  navigateTo(url, data={}) {
    console.log('navigateTo', url, data);
    window.history.pushState(null, null, url);
    this.routeMatch = {
      url: '/' + url.replace(this.root, '')
    }
    console.log('Route match', this.routeMatch);

    console.log('Emitting event');
    //Ionic.emit(this.$instance, 'ionRouterNavigation', { detail: this.routeMatch });
  }

  componentWillLoad() {
    console.log('<ion-router> loaded');
    window.addEventListener('popstate', this.handlePopState.bind(this));
    window.addEventListener('hashchange', this.handleHashChange.bind(this));

    const initialPath = window.location.pathname
    const withoutBase = initialPath.replace(this.root, '')

    this.routeMatch = {
      url: "/" + withoutBase
    }
    console.log('Route match', this.routeMatch);
  }

  componentDidLoad() {
    this.$el.dispatchEvent(new (window as any).CustomEvent('stencilRouterLoaded'))
  }

  handlePopState(e) {
    console.log('Pop state', e)
  }

  handleHashChange(e) {
    console.log('Hash change', e)
  }

  render() {
    console.log('<ion-router> rendering')
    return (
      <slot></slot>
    );
  }
}
