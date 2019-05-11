import { Component, Host, Prop, Watch, ComponentInterface, h, Build } from '@stencil/core';
import siteStructure from '../../assets/docs-structure.json';
import { findItem, fileNotFound, ItemInfo } from '../../global/site-structure-utils';
import { MarkdownContent, SiteStructureItem } from '../../global/definitions';


@Component({
  tag: 'doc-component',
  styleUrl: 'doc-component.css'
})
export class DocumentComponent implements ComponentInterface {

  @Prop() page: string = null;
  @Prop({ reflect: true }) hash: string;

  data: ItemInfo;
  content: MarkdownContent;
  lastHash: string;

  componentWillLoad() {
    return this.fetchNewContent();
  }

  @Watch('page')
  async fetchNewContent() {
    if (this.page) {
      this.data = findItem(siteStructure as SiteStructureItem[], this.page);

      if (!Build.isBrowser && !this.data.item) {
        fileNotFound();
        return;
      }

      this.content = await fetchContent(this.data.item.filePath);

      this.lastHash = this.hash;
      this.hash = this.content.hash;
    }
  }

  render() {
    const data = this.data;
    const content = this.content;
    if (!data || !content) {
      return null;
    }

    const hasContentChanged = (this.lastHash !== this.hash);

    return (
      <Host>
        <stencil-route-title pageTitle={content.title}></stencil-route-title>
        <app-burger />
        <site-menu selectedParent={data.parent} siteStructureList={siteStructure as SiteStructureItem[]} />
          <div class="doc-content measure-lg" ref={elm => {
            if (hasContentChanged) {
              elm.innerHTML = content.html
            }
          }}>
          <lower-content-nav next={data.nextItem} prev={data.prevItem}></lower-content-nav>
          <contributor-list contributors={content.contributors}></contributor-list>
        </div>
        <in-page-navigation
          pageLinks={content.headings}
          srcUrl={content.srcPath}
          currentPageUrl={content.url}
        ></in-page-navigation>
      </Host>
    );
  }
}


const localCache = new Map<string, Promise<MarkdownContent>>();

const fetchContent = (path: string) => {
  let promise = localCache.get(path);
  if (!promise) {
    promise = fetch(path, {cache: 'force-cache'}).then(response => response.json());
    localCache.set(path, promise);
  }
  return promise;
}
