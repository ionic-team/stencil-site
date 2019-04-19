import { Component, Element, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'lazy-iframe',
  styleUrl: 'lazy-iframe.css'
})
export class LazyIframe {
  @Prop() src?: string;
  @Prop() name?: string;
  @Prop() frameBorder?: string;
  @Prop() scrolling?: string;
  @Prop() width?: string;
  @Prop() height?: string;
  @Prop() identifier?: string;
  @Prop() isVideo?: boolean;

  @Event() videoLoaded: EventEmitter;

  @State() realSrc?: string;

  @Element() el!: HTMLElement;

  io?: IntersectionObserver;

  componentDidLoad() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data: any[]) => {
        if (data[0].isIntersecting) {
          this.handleIframe();
          this.cleanup();
        }
      });

      this.io.observe(this.el.querySelector('iframe'));
    } else {
      this.handleIframe();
    }
  }

  componentDidUnload() {
    this.cleanup();
  }

  handleIframe() {
    console.log('handl iframe')
    this.realSrc = this.src;
    this.videoLoadedHandler();
  }

  videoLoadedHandler() {
    this.videoLoaded.emit();
  }

  cleanup() {
    // always make sure we remove the intersection
    // observer when its served its purpose so we dont
    // eat cpu cycles unnecessarily
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  render() {
    return (
      <div>
        <iframe
          id={this.identifier}
          frameBorder="0"
          title={this.name}
          allowFullScreen={true}
          src={this.realSrc}
          frameborder={this.frameBorder}
          scrolling={this.scrolling}
          width={this.width}
          height={this.height}></iframe>
      </div>
    );
  }
}
