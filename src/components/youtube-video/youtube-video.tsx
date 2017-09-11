import { Component, Element, Prop, State } from '@stencil/core';
@Component({
  tag: 'youtube-video',
  styleUrl: 'youtube-video.scss'
})
export class YoutubeVideo {

  @Prop() video: string;
  @Prop() title: string;

  @State() fullSrc: string = '';

  @Element() el: HTMLElement;

  io: IntersectionObserver;

  componentDidLoad() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data: any[]) => {
        if (data[0].isIntersecting) {
          this.handleIframe();
          this.cleanup();
        }
      });
  
      this.io.observe(this.el.querySelector('.videoWrapper'));
    } else {
      this.handleIframe();
    }
  }

  componentDidUnload() {
    this.cleanup();
  }

  handleIframe() {
    this.fullSrc = `https://www.youtube.com/embed/${this.video}`;
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
        <div class="videoWrapper">
          <iframe frameBorder="0" title={this.title} allowFullScreen={true} width="560" height="315" src={this.fullSrc} ></iframe>
        </div>
      </div>
    );
  }
}
