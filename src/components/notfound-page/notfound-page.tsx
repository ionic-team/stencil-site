import { Component } from '@stencil/core';


@Component({
  tag: 'notfound-page',
  styleUrl: 'notfound-page.css'
})
export class NotFoundPage {

  render() {
    return (
      <div>
        <h1>Uh oh! We can't find the page your looking for.</h1>
        <p>
          <stencil-route-link url='/' class='block'>
            Head back to the home page
          </stencil-route-link>
        </p>
      </div>
    );
  }
}
