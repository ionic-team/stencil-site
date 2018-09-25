import marked from 'marked';
import glob from 'glob';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { rimraf, mkdirp } from '@stencil/utils';
import createRenderer from './markdown-renderer';
import frontMatter from 'front-matter';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const globAsync = promisify(glob);

const DESTINATION_DIR = './src/docs-content';
const SOURCE_DIR = './src/docs';

(async function() {
  console.log(`running glob: ${SOURCE_DIR}/**/*.md`);
  const files = await globAsync(`${SOURCE_DIR}/**/*.md`, {});

  await rimraf(DESTINATION_DIR);

  const filePromises = files.map(async (file) => {
    let htmlContents = '';
    let parsedMarkdown: any;
    let markdownMetadata: any;
    const jsonFileName = path.relative(SOURCE_DIR, file);
    const destinationFileName = path.join(
      DESTINATION_DIR,
      path.dirname(jsonFileName),
      path.basename(jsonFileName, '.md') + '.json'
    ); 

    const markdownContents = await readFile(file, { encoding: 'utf8' });

    try {
      parsedMarkdown = frontMatter(markdownContents);
      const { renderer, metadata } = createRenderer();
      markdownMetadata = metadata;
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