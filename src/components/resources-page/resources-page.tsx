import { Component, h, State, Host } from '@stencil/core';
import { RESOURCES } from './resources-data';

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
    ev.preventDefault();
    ev.stopPropagation();
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
        <div class="container">
          <header>
            <h1 class="headline measure-md">
              <span>Resources</span> to help you get more out of Stencil
            </h1>
            <form class="form" onSubmit={this.handleSearchSubmit}>
              <div class="form-group">
                <input name="search" type="search" value={this.searchTerm} onInput={this.handleSearchInput} placeholder="Search Resources" aria-label="Search" required />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.48776 6.4556C7.19995 6.16779 6.74338 6.16779 6.47995 6.4556C5.49557 7.43999 4.94434 8.75999 4.94434 10.1756C4.94434 11.5678 5.49653 12.8878 6.47995 13.8956C6.62433 14.04 6.81557 14.1112 6.98434 14.1112C7.15215 14.1112 7.34433 14.039 7.48872 13.8956C7.77653 13.6078 7.77653 13.1512 7.48872 12.8878C6.76872 12.1678 6.36091 11.2078 6.36091 10.2C6.36091 9.19227 6.76872 8.23223 7.48872 7.51227C7.75217 7.20008 7.75217 6.74447 7.48778 6.45572L7.48776 6.4556Z"
                    fill="black"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M21.12 20.1123L15.9844 14.9523C16.4644 14.3523 16.8722 13.7045 17.1601 13.0079C17.5201 12.0958 17.7122 11.1601 17.7122 10.1757C17.7122 9.19132 17.5201 8.2557 17.1601 7.34346C16.7757 6.40785 16.2244 5.56785 15.5044 4.84794C14.7844 4.12804 13.9444 3.57575 13.0089 3.19233C12.0967 2.83233 11.1611 2.64014 10.1767 2.64014C9.1923 2.64014 8.25668 2.83232 7.34444 3.19233C6.40882 3.57671 5.56883 4.12794 4.84892 4.84794C4.12902 5.56794 3.57673 6.40794 3.19331 7.34346C2.83331 8.25566 2.64111 9.19127 2.64111 10.1757C2.64111 11.1601 2.8333 12.0957 3.19331 13.0079C3.57769 13.9436 4.12892 14.7836 4.84892 15.5035C5.56892 16.2234 6.40892 16.7757 7.34444 17.1591C8.25663 17.5191 9.19225 17.7113 10.1767 17.7113C11.1611 17.7113 12.0967 17.5191 13.0089 17.1591C13.7289 16.8713 14.3767 16.4869 14.9533 15.9835L20.1123 21.1199C20.2567 21.2643 20.448 21.3356 20.6167 21.3356C20.8089 21.3356 20.9767 21.2634 21.1211 21.1199C21.408 20.8556 21.408 20.3999 21.1202 20.1121L21.12 20.1123ZM10.1755 16.2478C8.54329 16.2478 7.031 15.6235 5.87996 14.4722C3.50435 12.0966 3.50435 8.25671 5.87996 5.87999C7.05558 4.70438 8.61548 4.10438 10.1755 4.10438C11.7355 4.10438 13.2955 4.70438 14.471 5.87999C16.8466 8.25561 16.8466 12.0955 14.471 14.4722C13.3197 15.6244 11.8075 16.2478 10.1755 16.2478Z"
                    fill="black"
                    fill-opacity="0.5"
                  />
                </svg>
              </div>
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

          <section class="measure-lg">
            <h2>Present Stencil</h2>
            <div class="slide-wrapper screenshot">
              <iframe src="https://ionic-team.github.io/stencil-present/" title="Present Stencil" loading="lazy"></iframe>
            </div>
            <p>
              A forkable presentation for your next meetup or conference talk on Stencil. Built with <a href="https://github.com/hakimel/reveal.js">Reveal.js</a>
            </p>
            <a target="_blank" rel="noopener" href="https://ionic-team.github.io/stencil-present/">
              Stencil Presentation
            </a>
            <br />
            <a target="_blank" rel="noopener" href="https://github.com/ionic-team/stencil-present/">
              Source
            </a>
          </section>
        </div>
      </Host>
    );
  }
}
