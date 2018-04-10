import { Component, Element, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'app-burger',
  styleUrl: 'app-burger.scss'
})
export class AppBurger {

  @Element() el: HTMLElement;

  @Event() burgerClick: EventEmitter;

  @State() isActive: boolean;

  componentDidLoad() {
    this.isActive = false;
  }

  handleBurgerClicked() {
    this.burgerClick.emit();

    if (this.isActive) {
      this.isActive = false;
      this.el.classList.remove('active');
    } else {
      this.isActive = true;
      this.el.classList.add('active');
    }
  }

  render() {
    return (
      <div class="burger" onClick={() => this.handleBurgerClicked() }>
        <app-icon name="menu"></app-icon>
        <app-icon name="close"></app-icon>
      </div>
    )
  }
}
