import marked from 'marked';
import glob from 'glob';
import Prism from 'prismjs';
import { promisify } from 'util';
import loadLanguages from 'prismjs/components/';
import path from 'path';
import fs from 'fs';
import { rimraf, mkdirp } from '@stencil/utils';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const globAsync = promisify(glob);

const DESTINATION_DIR = './src/docs-content';
const SOURCE_DIR = './src/docs-md';

const languages = ['tsx', 'bash', 'typescript', 'markup', 'css', 'json'];
loadLanguages(languages);

const renderer = new marked.Renderer();

function highlight(code: string, lang?: string) {
  if (lang != null && languages.indexOf(lang) !== -1) {
    return Prism.highlight(code, Prism.languages[lang]);
  }
  return code;
}

renderer.code = function (code, language, escaped) {
  const [lang, hcl] = language ? language.split(':') : [undefined, undefined];
  const out = highlight(code, lang);
  if (out != null && out !== code) {
    escaped = true;
    code = out;
  }

  if (!lang) {
    return `<pre><code>${(escaped ? code : escape(code))}</code></pre>`;
  }

  return `
<highlight-code-line ${hcl ? `lines="${hcl}"`: ``}>
  <pre class="language-${escape(lang)}"><code class="language-${escape(lang)}">${(escaped ? code : escape(code))}</code></pre>
</highlight-code-line>
`;
};

(async function() {
  console.log(`running glob: ${SOURCE_DIR}/**/*.md`);
  const files = await globAsync(`${SOURCE_DIR}/**/*.md`, {});

  await rimraf(DESTINATION_DIR);

  const filePromises = files.map(async (file) => {
    const jsonFileName = path.relative(SOURCE_DIR, file);
    const destinationFileName = path.join(
      DESTINATION_DIR,
      path.dirname(jsonFileName),
      path.basename(jsonFileName, '.md') + '.json'
    ); 

    const markdownContents = await readFile(file, { encoding: 'utf8' });
    
    const htmlContents = marked(markdownContents, {
      renderer: renderer,
    });

    await mkdirp(path.join(
      DESTINATION_DIR,
      path.dirname(jsonFileName)
    ));
    await writeFile(destinationFileName, JSON.stringify({
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