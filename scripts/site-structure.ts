import marked from 'marked';
import { promisify } from 'util';
import fs from 'fs';
import { listFactory } from './markdown-renderer';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const DESTINATION_FILE = './src/docs-content/structure.json';
const SOURCE_FILE = './src/docs/README.md';

const renderer = new marked.Renderer();

(async function() {
  const metadata = {};
  const markdownContents = await readFile(SOURCE_FILE, { encoding: 'utf8' });

  try {
    listFactory(renderer, metadata)
    marked(markdownContents, {
      renderer,
    });
    console.log(metadata);
  } catch (e) {
    throw e;
  }

  await writeFile(DESTINATION_FILE, JSON.stringify({

  }), {
    encoding: 'utf8'
  });
})();