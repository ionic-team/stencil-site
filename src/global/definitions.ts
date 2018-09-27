export interface MarkdownContent {
  title?: string;
  description?: string;
  url?: string;
  contributors?: string[];
  content?: string;
}

export interface SiteStructureItem {
  text: string,
  url?: string;
  filePath?: string,
  children?: SiteStructureItem[]
}
