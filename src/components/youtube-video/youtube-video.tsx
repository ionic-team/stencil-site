import { Component, Prop } from '@stencil/core';
@Component({
  tag: 'youtube-video',
  styleUrl: 'youtube-video.scss'
})
export class DocumentComponent {
  @Prop() video: string;
  render() {
    return (
      <div>
        <div class="videoWrapper">
          <iframe frameBorder="0" allowFullScreen={true} width="560" height="315" src={'https://www.youtube.com/embed/'+this.video} ></iframe>
        </div>
      </div>
    );
  }
}
