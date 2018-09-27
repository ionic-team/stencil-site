import { SiteStructureItem } from './definitions';

export interface ItemInfo {
  item?: SiteStructureItem
  nextItem?: SiteStructureItem;
  prevItem?: SiteStructureItem;
}

export function findItem(siteStructureList: SiteStructureItem[], url: string, foundData: ItemInfo = {}) {

  for (const item of siteStructureList) {
    if (item.url === url) {
      foundData.item = item;
    } else if (foundData.item != null && item.url != null) {
      foundData.nextItem = item;
    } else {
      if (item.url != null) {
        foundData.prevItem = item;
      }
      if (item.children && item.children.length > 0) {
        foundData = findItem(item.children, url, foundData);
      }
    }
    if (foundData.item != null && foundData.nextItem != null && foundData.nextItem != null) {
      return foundData;
    }
  }

  return foundData;
}
