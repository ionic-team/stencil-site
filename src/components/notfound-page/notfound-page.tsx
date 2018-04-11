import { Component } from '@stencil/core';


@Component({
  tag: 'notfound-page',
  styleUrl: 'notfound-page.scss'
})
export class NotFoundPage {

  render() {
    return (
      <div>
        <h2>Uh Oh, we could not find the page your looking for</h2>

        <stencil-route-link url='/' class='block'>
          Home Page
        </stencil-route-link>
      </div>
    );
  }
}