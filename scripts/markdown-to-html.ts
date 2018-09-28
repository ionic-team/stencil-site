import marked from 'marked';
import glob from 'glob';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { rimraf, mkdirp } from '@stencil/utils';
import { collectHeadingMetadata, changeCodeCreation, localizeMarkdownLink } from './markdown-renderer';
import frontMatter from 'front-matter';
import { SiteStructureItem, MarkdownContent } from '../src/global/definitions';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const globAsync = promisify(glob);

const DESTINATION_DIR = './src/assets/docs';
const SOURCE_DIR = './src/docs';
const SITE_STRUCTURE_FILE= './src/assets/docs-structure.json';

const renderer = new marked.Renderer();

(async function() {
  const siteStructure = await readFile(SITE_STRUCTURE_FILE, { encoding: 'utf8' });
  const siteStructureJson: SiteStructureItem[] = JSON.parse(siteStructure);
  console.log(`running glob: ${SOURCE_DIR}/**/*.md`);
  const files = await globAsync(`${SOURCE_DIR}/**/*.md`, {});

  await rimraf(DESTINATION_DIR);

  const filePromises = files.map(async (file) => {
    if (file === './src/docs/README.md') {
      return Promise.resolve();
    }
    let htmlContents = '';
    let parsedMarkdown: any;
    let markdownMetadata: MarkdownContent = {};
    const jsonFileName = path.relative(SOURCE_DIR, file);
    const destinationFileName = path.join(
      DESTINATION_DIR,
      path.dirname(jsonFileName),
      path.basename(jsonFileName, '.md') + '.json'
    );
    markdownMetadata.headings = [];

    const markdownContents = await readFile(file, { encoding: 'utf8' });

    try {
      parsedMarkdown = frontMatter(markdownContents);
      collectHeadingMetadata(renderer, markdownMetadata);
      changeCodeCreation(renderer);
      localizeMarkdownLink(renderer, destinationFileName.replace('src',''), siteStructureJson);
      htmlContents = marked(parsedMarkdown.body, {
        renderer,
        headerIds: true
      });
    } catch (e) {
      console.error(file);
      throw e;
    }

    await mkdirp(path.join(
      DESTINATION_DIR,
      path.dirname(jsonFileName)
    ));
    await writeFile(destinationFileName, JSON.stringify({
      ...parsedMarkdown.attributes,
      ...markdownMetadata,
      srcPath: file,
      content: htmlContents
    }), {
      encoding: 'utf8'
    });

    console.log(`converted: ${file} => ${destinationFileName}`);
  });

  await Promise.all(filePromises);

  console.log(`successfully converted ${filePromises.length} files`);
})();