import { Component, Prop } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';
import { SiteStructureItem } from '../../global/definitions';

@Component({
  tag: 'site-menu',
  styleUrl: 'site-menu.css'
})
export class SiteMenu {
  @Prop() siteStructureList: SiteStructureItem[];

  render() {
    return (
      <SiteProviderConsumer.Consumer>
      {({ toggleLeftSidebar }: SiteState) => (
        <div>
          <ul class='menu-list'>
            { this.siteStructureList.map((item) => (
              <li>
                <h4>{item.text}</h4>
                <ul>
                { item.children.map((childItem) => (
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
        </div>
      )}
      </SiteProviderConsumer.Consumer>
    );
  }
}
