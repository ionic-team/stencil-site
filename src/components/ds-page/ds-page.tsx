import { Component } from '@stencil/core';

@Component({
  tag: 'ds-page',
  styleUrl: 'ds-page.css'
})
export class DSPage {

  constructor() {
    document.title = `Stencil DS - Stencil for Production Design Systems`;
  }

  render() {
    return [
      <h1 class="headline measure-md">Stencil DS: Production-ready Design Systems at Scale</h1>,

      <div class="measure-lg">
        Is your company struggling to build shared components across teams using a diverse set of frontend frameworks
        and technologies, all while enforcing brand guidelines and exceeding accessibility standards?
      </div>
    ];
  }
}
