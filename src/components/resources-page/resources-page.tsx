import { Component, h, State, Host } from '@stencil/core';
import { RESOURCES } from './resources-data';
import { ResponsiveContainer } from '@ionic-internal/ionic-ds';

@Component({
  tag: 'resources-page',
  styleUrl: 'resources-page.css',
})
export class ResourcesPage {
  @State() searchTerm: string = '';
  @State() isLoading: boolean = false;
  @State() activeTab: string = 'article-blogs';

  constructor() {
    document.title = `Stencil Resources`;
    this.activateTab = this.activateTab.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.filterLinks = this.filterLinks.bind(this);
  }

  activateTab = (ev: any) => {
    this.activeTab = ev.target.id;
  };

  handleSearchInput = (ev: any) => {
    this.searchTerm = ev.target.value;
  };

  handleSearchSubmit = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  filterLinks(link: any) {
    if (!this.searchTerm.length) {
      return true;
    }

    return link.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
  }

  private renderTablist() {
    return (
      <div class="tablist" role="tablist" aria-label="Resources">
        <button
          role="tab"
          aria-selected="true"
          aria-controls="community-articles-blogs"
          id="article-blogs"
          class={this.activeTab === 'article-blogs' ? 'active' : ''}
          onClick={this.activateTab}
        >
          <span>Community Articles/Blogs</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <circle cx="256" cy="256.02" r="32" />
            <path d="M184.25,192.25a96,96,0,0,0,0,127.52" style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
            <path d="M327.77,319.77a96,96,0,0,0,0-127.52" style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
            <path d="M133.28,141.28a168,168,0,0,0,0,229.44" style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
            <path d="M378.72,370.72a168,168,0,0,0,0-229.44" style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
            <path d="M435,416a240.34,240.34,0,0,0,0-320" style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
            <path d="M77,96a240.34,240.34,0,0,0,0,320" style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
          </svg>
        </button>
        <button
          role="tab"
          aria-selected="false"
          aria-controls="videos-media"
          id="videos-media"
          class={this.activeTab === 'videos-media' ? 'active' : ''}
          onClick={this.activateTab}
        >
          <span>Videos and Media</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style={{ 'fill': 'none', 'stroke-miterlimit': '10', 'stroke-width': '32px' }} />
            <path d="M216.32,334.44,330.77,265.3a10.89,10.89,0,0,0,0-18.6L216.32,177.56A10.78,10.78,0,0,0,200,186.87V325.13A10.78,10.78,0,0,0,216.32,334.44Z" />
          </svg>
        </button>
        <button role="tab" aria-selected="false" aria-controls="tools" id="tools" class={this.activeTab === 'tools' ? 'active' : ''} onClick={this.activateTab}>
          <span>Templates &amp; Tools</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M436.67,184.11a27.17,27.17,0,0,1-38.3,0l-22.48-22.49a27.15,27.15,0,0,1,0-38.29l50.89-50.89a.85.85,0,0,0-.26-1.38C393.68,57,351.09,64.15,324.05,91c-25.88,25.69-27.35,64.27-17.87,98a27,27,0,0,1-7.67,27.14l-173,160.76a40.76,40.76,0,1,0,57.57,57.54l162.15-173.3A27,27,0,0,1,372,253.44c33.46,8.94,71.49,7.26,97.07-17.94,27.49-27.08,33.42-74.94,20.1-102.33a.85.85,0,0,0-1.36-.22Z"
              style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-miterlimit': '10', 'stroke-width': '32px' }}
            />
            <path
              d="M224,284c-17.48-17-25.49-24.91-31-30.29a18.24,18.24,0,0,1-3.33-21.35,20.76,20.76,0,0,1,3.5-4.62l15.68-15.29a18.66,18.66,0,0,1,5.63-3.87,18.11,18.11,0,0,1,20,3.62c5.45,5.29,15.43,15,33.41,32.52"
              style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }}
            />
            <path
              d="M317.07,291.3c40.95,38.1,90.62,83.27,110,99.41a13.46,13.46,0,0,1,.94,19.92L394.63,444a14,14,0,0,1-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107"
              style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }}
            />
            <path
              d="M17.34,193.5l29.41-28.74a4.71,4.71,0,0,1,3.41-1.35,4.85,4.85,0,0,1,3.41,1.35h0a9.86,9.86,0,0,0,8.19,2.77c3.83-.42,7.92-1.6,10.57-4.12,6-5.8-.94-17.23,4.34-24.54a207,207,0,0,1,19.78-22.6c6-5.88,29.84-28.32,69.9-44.45A107.31,107.31,0,0,1,206.67,64c22.59,0,40,10,46.26,15.67a89.54,89.54,0,0,1,10.28,11.64A78.92,78.92,0,0,0,254,88.54,68.82,68.82,0,0,0,234,87.28c-13.33,1.09-29.41,7.26-38,14-13.9,11-19.87,25.72-20.81,44.71-.68,14.12,2.72,22.1,36.1,55.49a6.6,6.6,0,0,1-.34,9.16l-18.22,18a6.88,6.88,0,0,1-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85,30.85,0,0,0-18.27,3.87,11.39,11.39,0,0,0-2.64,2,14.14,14.14,0,0,0,.42,20.08l1.71,1.6a4.63,4.63,0,0,1,0,6.64L71.73,246.6A4.71,4.71,0,0,1,68.32,248a4.86,4.86,0,0,1-3.41-1.35L17.34,200.22A4.88,4.88,0,0,1,17.34,193.5Z"
              style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }}
            />
          </svg>
        </button>
        <button
          role="tab"
          aria-selected="true"
          aria-controls="third-party-packages"
          id="third-party"
          class={this.activeTab === 'third-party' ? 'active' : ''}
          onClick={this.activateTab}
        >
          <span>3rd Party Components</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M448,341.37V170.61A32,32,0,0,0,432.11,143l-152-88.46a47.94,47.94,0,0,0-48.24,0L79.89,143A32,32,0,0,0,64,170.61V341.37A32,32,0,0,0,79.89,369l152,88.46a48,48,0,0,0,48.24,0l152-88.46A32,32,0,0,0,448,341.37Z"
              style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }}
            />
            <polyline points="69 153.99 256 263.99 443 153.99" style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
            <line x1="256" y1="463.99" x2="256" y2="263.99" style={{ 'fill': 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
          </svg>
        </button>
        <button role="tab" aria-selected="true" aria-controls="demos" id="demos" class={this.activeTab === 'demos' ? 'active' : ''} onClick={this.activateTab}>
          <span>Demos</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <rect x="48" y="96" width="416" height="304" rx="32.14" ry="32.14" style={{ 'fill': 'none', 'stroke-linejoin': 'round', 'stroke-width': '32px' }} />
            <line x1="16" y1="416" x2="496" y2="416" style={{ 'stroke-linecap': 'round', 'stroke-miterlimit': '10', 'stroke-width': '32px' }} />
          </svg>
        </button>
      </div>
    );
  }

  private renderItems(arr: any[]) {
    return arr.filter(this.filterLinks).map(link => {
      return (
        <li>
          <a target="_blank" rel="noopener" href={link.url}>
            {link.title}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <Host>
        <ResponsiveContainer>
          <header>
            <h1 class="headline measure-md">
              <span>Resources</span> to help you get more out of Stencil
            </h1>
            <form class="form" onSubmit={this.handleSearchSubmit}>
              <search-bar searchTerm={this.searchTerm} handleInput={this.handleSearchInput} placeholder={'Search Resources'}></search-bar>
            </form>
            <p>
              <a class="add-resource" href="https://github.com/ionic-team/stencil-site/edit/master/src/components/resources-page/resources-data.ts">
                + Add A Resource
              </a>
            </p>
          </header>

          <section>
            <div class="tabs">
              {this.renderTablist()}
              <div class="tabpanel" tabindex="0" role="tabpanel" id="community-articles-blogs" aria-labelledby="article-blogs" hidden={this.activeTab !== 'article-blogs'}>
                <section class="measure-lg">
                  <header>
                    <h2>Community Articles/Blogs</h2>
                    <p>Disclaimer: these articles are community-created, and might contain inaccurate, or outdated information and code snippets.</p>
                  </header>
                  <ul class="list--unstyled">{this.renderItems(RESOURCES.BLOGS)}</ul>
                </section>
              </div>
              <div class="tabpanel" tabindex="0" role="tabpanel" id="videos-media" aria-labelledby="videos-media" hidden={this.activeTab !== 'videos-media'}>
                <section class="measure-lg">
                  <header>
                    <h2>Videos</h2>
                  </header>
                  <ul class="list--unstyled">{this.renderItems(RESOURCES.VIDEOS)}</ul>
                </section>
              </div>
              <div class="tabpanel" tabindex="0" role="tabpanel" id="tools" aria-labelledby="tools" hidden={this.activeTab !== 'tools'}>
                <section class="measure-lg">
                  <header>
                    <h2>Templates &amp; Tools</h2>
                  </header>
                  <ul class="list--unstyled">
                    {' '}
                    {this.renderItems(RESOURCES.TEMPLATES)}
                    {this.renderItems(RESOURCES.TOOLS)}
                  </ul>
                </section>
              </div>
              <div class="tabpanel" tabindex="0" role="tabpanel" id="third-party-packages" aria-labelledby="third-party" hidden={this.activeTab !== 'third-party'}>
                <section class="measure-lg">
                  <header>
                    <h2>3rd Party Components, Templates and Tools</h2>
                  </header>
                  <ul class="list--unstyled">{this.renderItems(RESOURCES.COMPONENTS)}</ul>
                </section>
              </div>
              <div class="tabpanel" tabindex="0" role="tabpanel" id="demos" aria-labelledby="demos" hidden={this.activeTab !== 'demos'}>
                <section>
                  <header>
                    <h2>Demos</h2>
                    <p>Demos of apps built using Stencil and Ionic</p>
                  </header>
                  <div class="demo-card-list">
                    {RESOURCES.DEMOS.filter(this.filterLinks).map(demo => {
                      return <demo-card name={demo.title} description={demo.description} imgPath={demo.imgPath} demoUrl={demo.demoUrl} sourceUrl={demo.sourceUrl}></demo-card>;
                    })}
                  </div>
                </section>
              </div>
            </div>
          </section>
        </ResponsiveContainer>
      </Host>
    );
  }
}
