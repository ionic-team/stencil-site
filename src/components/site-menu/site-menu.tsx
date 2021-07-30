import { Build, Component, Prop, State, ComponentInterface, h } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';
import { SiteStructureItem } from '../../global/definitions';

declare var docsearch: any;
@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.css',
})
export class SiteMenu implements ComponentInterface {
  @Prop() siteStructureList: SiteStructureItem[] = [];
  @Prop({ mutable: true }) selectedParent?: SiteStructureItem;

  @State() searchTerm: string = '';
  @State() searchResults: any = [];

  index: any;

  componentDidLoad(){
    if (Build.isBrowser) {
      docsearch({
        apiKey: '6399791d239c7e56a6b47685a64f8873',
        indexName: 'stenciljs',
        inputSelector: 'input[name="search"]',
        debug: false // Set debug to true if you want to inspect the dropdown
      });
    }
  }

  toggleParent = (parentItem: SiteStructureItem) => {
    return (e: MouseEvent) => {
      e.preventDefault();
      this.selectedParent = parentItem;
    };
  };

  render() {
    return (
      <div class="sticky">
        <SiteProviderConsumer.Consumer>
          {({ toggleLeftSidebar }: SiteState) => (
            <div>
              <search-bar class="site-search" debounce={500} searchTerm={this.searchTerm} placeholder={'Search Docs'}></search-bar>
              <ul class="menu-list">
                {this.siteStructureList.map(item => !item.hideFromSidebar && (
                  <li>
                    <a href={item.children![0].url || '#'} onClick={this.toggleParent(item)}>
                      <span class="section-label">{item.text}</span>
                    </a>
                    <ul class={{ collapsed: item !== this.selectedParent }}>
                      {item.children!.map(childItem => (
                        <li>
                          {childItem.url ? (
                            <stencil-route-link url={childItem.url} onClick={toggleLeftSidebar}>
                              {childItem.text}
                            </stencil-route-link>
                          ) : (
                              <a rel="noopener" class="link--external" target="_blank" href={childItem.filePath}>
                                {childItem.text}
                              </a>
                            )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </SiteProviderConsumer.Consumer>
      </div>
    );
  }
}
