import { Component } from '@stencil/core';

@Component({
  tag: 'what-is',
  styleUrl: 'what-is.scss'
})
export class WhatIs {

  render() {
    return [
      <app-marked doc='intro/index.html'></app-marked>,
      <app-marked doc='intro/why.html'></app-marked>,
      <app-marked doc='intro/history.html'></app-marked>
    ]
  }
}
