import { Component, State, h, getWindow } from '@stencil/core';

@Component({
  tag: 'custom-clock'
})
export class CustomClock {
  win = getWindow(this);

  timer: number;

  @State() time: number = Date.now();

  componentDidLoad() {
    this.timer = this.win.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  componentDidUnload() {
    this.win.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.time).toLocaleTimeString();

    return (
      <span>{ time }</span>
    );
  }
}