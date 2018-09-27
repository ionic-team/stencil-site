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
                    <stencil-route-link url={childItem.url} onClick={() => toggleLeftSidebar()}>
                      {childItem.text}
                    </stencil-route-link>                    
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
