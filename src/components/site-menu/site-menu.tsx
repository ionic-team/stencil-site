import { Component, Prop, State, ComponentInterface, h } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';
import { SiteStructureItem } from '../../global/definitions';
import { getSearchIndex } from '../../global/site-search';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.css'
})
export class SiteMenu implements ComponentInterface {
  @Prop() siteStructureList: SiteStructureItem[] = [];
  @Prop({ mutable: true }) selectedParent?: SiteStructureItem;

  @State() searchTerm: string = '';
  @State() searchResults: any = [];

  index: any;

  constructor() {
    this.index = getSearchIndex();
    this.doSiteSearch = this.doSiteSearch.bind(this);
  }

  toggleParent = (parentItem: SiteStructureItem) => {
    return (e: MouseEvent) => {
      e.preventDefault();
      this.selectedParent = parentItem;
    }
  }

  doSiteSearch(ev: any) {
    this.searchTerm = ev.target.value;

    if (!this.searchTerm || this.searchTerm.length < 2) {
      this.searchResults = [];
      return;
    }

    this.index.search(this.searchTerm, { hitsPerPage: 6 })
      .then((responses: any) => {
        if (responses.hits) {
          this.searchResults = responses.hits;
        } else {
          this.searchResults = [];
        }
      });
  }

  render() {
    return (
      <div class="sticky">
        <SiteProviderConsumer.Consumer>
        {({ toggleLeftSidebar }: SiteState) => (
          <div>
            {process.env.ENABLE_SEARCH === "true" &&
              <search-bar class="site-search" debounce={500} searchTerm={this.searchTerm} handleInput={this.doSiteSearch} placeholder={'Search Docs'}></search-bar>
            }
            {this.searchResults.length > 0 &&
              <div class="wrapper">
                <ul class="menu-search-list">
                  {this.searchResults.map((hit: any) => (
                    <li>
                      <a href={hit.url}>
                        <span class="section-label" innerHTML={hit._highlightResult.title.value}></span>
                        <p innerHTML={
                          `${hit._highlightResult.line.value.length > 75 ? `${hit._highlightResult.line.value.substring(0, 75)}...` : hit._highlightResult.line.value}`
                        }></p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            }
            {!this.searchResults.length &&
              <ul class='menu-list'>
                { this.siteStructureList.map((item) => (
                  <li>
                    <a href={item.children![0].url || '#'} onClick={this.toggleParent(item)}>
                      <span class="section-label">
                        {item.text}
                      </span>
                    </a>
                    <ul class={{ 'collapsed': item !== this.selectedParent }}>
                    { item.children!.map((childItem) => (
                      <li>
                        { (childItem.url) ?
                        <stencil-route-link url={childItem.url} onClick={toggleLeftSidebar}>
                          {childItem.text}
                        </stencil-route-link> :
                        <a rel="noopener" class="link--external" target="_blank" href={childItem.filePath}>
                          {childItem.text}
                        </a> }
                      </li>
                    )) }
                    </ul>
                  </li>
                )) }
              </ul>
            }
          </div>
        )}
        </SiteProviderConsumer.Consumer>
      </div>
    );
  }
}
