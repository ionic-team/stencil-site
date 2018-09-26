import marked from 'marked';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import { listFactory } from './markdown-renderer';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const DESTINATION_FILE = './src/assets/docs-structure.json';
const SOURCE_FILE = './src/docs/README.md';

const renderer = new marked.Renderer();

(async function() {
  const metadata: any = {};
  const markdownContents = await readFile(SOURCE_FILE, { encoding: 'utf8' });

  try {
    listFactory(renderer, metadata)
    marked(markdownContents, {
      renderer,
    });
  } catch (e) {
    throw e;
  }

  await walkUpdateChildren(metadata.list, SOURCE_FILE);
  await writeFile(DESTINATION_FILE, JSON.stringify(metadata, null, 2), {
    encoding: 'utf8'
  });
})();

async function walkUpdateChildren(itemList, sourcePath) {
  for (const item of itemList) {
    if (item.filePath) {
      if (item.filePath.indexOf('//') === -1) {
        let fullPath = path.join(path.dirname(sourcePath), item.filePath);
        fullPath = await getMarkdownFileSitePath(fullPath);
        item.filePath = fullPath;
      }
    }
    if (item.children) {
      await walkUpdateChildren(item.children, sourcePath);
    }
  }
}

async function getMarkdownFileSitePath(filePath) {
  let markdownContents: any;
  try {
    markdownContents = await readFile(filePath, { encoding: 'utf8' });
  } catch (e) {
    return null;
  }

  if (!markdownContents) {
    return null;
  }
  const metadata: any = frontMatter(markdownContents);
 
  return (metadata && metadata.attributes ? metadata.attributes.url : null);
}