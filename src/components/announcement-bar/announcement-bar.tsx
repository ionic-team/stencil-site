import { Component, State, h, Host } from '@stencil/core';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { ResponsiveContainer } from '@ionic-internal/ionic-ds';
import { slugify } from '../../global/common';

@Component({
  tag: 'announcement-bar',
  styleUrl: 'announcement-bar.css',
})
export class AnnouncementBar {
  apiURL = 'https://ionicframeworkcom.prismic.io/api/v2';

  @State() data: any;
  @State() key = 0;

  async componentWillLoad() {
    const api = await Prismic.getApi(this.apiURL);
    const single = await api.getSingle('announcement_bar');
    this.data = single.data;
  }

  componentWillUpdate() {
    this.key += 1;
  }

  render() {
    if (!this.data || Object.keys(this.data).length === 0) return;

    const theme = slugify(this.data.theme);
    const assetPath = `/assets/img/components/announcement-bar/bg-${theme}.png`;

    return (
      <Host>
        <a href={this.data.link.url} target="_blank" class="wrapper" key={this.key}>
          <nav
            style={{
              '--asset-path': `url('${assetPath}')`,
            }}
            class={`announcement-bar announcement-bar--${theme}`}
          >
            <ResponsiveContainer>
              <div innerHTML={PrismicDOM.RichText.asHtml(this.data.text)}></div>
              <a href={this.data.link.url} target="_blank" class="button">
                {this.data.button_text}
              </a>
            </ResponsiveContainer>
          </nav>
        </a>
      </Host>
    );
  }
}
