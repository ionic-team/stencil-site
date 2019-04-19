import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'custom-clock'
})
export class CustomClock {
  timer: any;

  @State() time: number = Date.now();

  componentDidLoad() {
    this.timer = setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  componentDidUnload() {
    clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.time).toLocaleTimeString();

    return (
      <span>{ time }</span>
    );
  }
}