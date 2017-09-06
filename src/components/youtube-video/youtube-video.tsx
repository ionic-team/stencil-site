import { Component, Prop } from '@stencil/core';
@Component({
  tag: 'youtube-video',
  styleUrl: 'youtube-video.scss'
})
export class YoutubeVideo {

  @Prop() video: string;
  @Prop() title: string;

  render() {
    return (
      <div>
        <div class="videoWrapper">
          <iframe frameBorder="0" title={this.title} allowFullScreen={true} width="560" height="315" src={'https://www.youtube.com/embed/'+this.video} ></iframe>
        </div>
      </div>
    );
  }
}
