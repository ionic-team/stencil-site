import marked from 'marked';
import glob from 'glob';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import url from 'url';
import { rimraf, mkdirp } from '@stencil/utils';
import { createDocument } from '@stencil/core/mock-doc';
import { collectHeadingMetadata, changeCodeCreation, localizeMarkdownLink } from './markdown-renderer';
import frontMatter from 'front-matter';
import fetch from 'node-fetch';
import { SiteStructureItem, MarkdownContent } from '../src/global/definitions';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const globAsync = promisify(glob);

const DESTINATION_DIR = './src/assets/docs';
const SOURCE_DIR = './src/docs';
const SITE_STRUCTURE_FILE= './src/assets/docs-structure.json';


(async function() {
  const siteStructure = await readFile(SITE_STRUCTURE_FILE, { encoding: 'utf8' });
  const siteStructureJson: SiteStructureItem[] = JSON.parse(siteStructure);
  console.log(`running glob: ${SOURCE_DIR}/**/*.md`);
  const files = await globAsync(`${SOURCE_DIR}/**/*.md`, {});

  await rimraf(DESTINATION_DIR);

  const filePromises = files.map(async (filePath) => {
    if (filePath === './src/docs/README.md') {
      return Promise.resolve();
    }
    let htmlContents = '';
    let markdownMetadata: MarkdownContent = {};
    const jsonFileName = path.relative(SOURCE_DIR, filePath);
    const destinationFileName = path.join(
      DESTINATION_DIR,
      path.dirname(jsonFileName),
      path.basename(jsonFileName, '.md') + '.json'
    );
    markdownMetadata.headings = [];

    const markdownContents = await readFile(filePath, { encoding: 'utf8' });

    try {
      let parsedMarkdown = frontMatter<any>(markdownContents);
      parsedMarkdown = await getGithubData(filePath, parsedMarkdown);

      const renderer = new marked.Renderer();

      collectHeadingMetadata(renderer, markdownMetadata);
      changeCodeCreation(renderer);
      localizeMarkdownLink(renderer, destinationFileName.replace('src',''), siteStructureJson);
      htmlContents = marked(parsedMarkdown.body, {
        renderer,
        headerIds: true
      }).trim();

      await mkdirp(path.join(
        DESTINATION_DIR,
        path.dirname(jsonFileName)
      ));

      const data = {
        ...parsedMarkdown.attributes,
        ...markdownMetadata,
        srcPath: filePath,
        hypertext: convertHtmlToHypertextData(htmlContents)
      };

      if (typeof data.title !== 'string') {
        data.title = 'Stencil';
      } else {
        data.title = data.title.trim() + ' - Stencil';
      }

      await writeFile(destinationFileName, JSON.stringify(data), {
        encoding: 'utf8'
      });

    } catch (e) {
      console.error(filePath);
      throw e;
    }
  });

  await Promise.all(filePromises);

  console.log(`successfully converted ${filePromises.length} files`);
})();


function convertHtmlToHypertextData(html: string) {
  const doc = createDocument();
  const div = doc.createElement('div');
  div.innerHTML = html;
  return convertElementToHypertextData(div);
}

function convertElementToHypertextData(node: Node) {
  const data = [];

  if (node.nodeType === 1) {
    const elm = node as HTMLElement;
    let tag = elm.tagName.toLowerCase();

    if (tagBlacklist.includes(tag)) {
      tag = 'template';
    }

    data.push(tag);

    if (elm.attributes.length > 0) {
      const attrs = {};
      for (let j = 0; j < elm.attributes.length; j++) {
        const attr = elm.attributes.item(j);
        attrs[attr.nodeName] = attr.nodeValue;
      }
      data.push(attrs);

    } else {
      data.push(null);
    }

    for (let i = 0; i < elm.childNodes.length; i++) {
      data.push(convertElementToHypertextData(elm.childNodes[i]));
    }

    return data;

  } else if (node.nodeType === 3) {
    return (node as Text).textContent;
  }

  return '';
}

const tagBlacklist = ['script', 'link', 'meta', 'object', 'head', 'html', 'body'];


async function getGithubData(filePath: string, parsedMarkdown: any) {
  const since = new Date('2018-06-01').toISOString();

  try {
    const request = await fetch(url.format({
      protocol: 'https',
      hostname: 'api.github.com',
      pathname: 'repos/ionic-team/stencil-site/commits',
      query: {
        access_token: process.env.GITHUB_TOKEN,
        since: since,
        path: filePath
      }
    }));

    const commits = await request.json();

    const contributors = Array.from(new Set(commits.map(commit => {
      if (commit && commit.author && commit.author.login) {
        return commit.author.login;
      }
      return null;
    }))).filter(l => typeof l === 'string');

    // const contributors = Array.from(new Set(commits.map(commit => commit.author.login)));
    const lastUpdated = commits.length ? commits[0].commit.author.date : since;

    const attributes = parsedMarkdown.attributes = parsedMarkdown.attributes || {};
    attributes.lastUpdated = lastUpdated;

    attributes.contributors = attributes.contributors || [];

    contributors.forEach(contributor => {
      if (!attributes.contributors.includes(contributor)) {
        attributes.contributors.push(contributor);
      }
    });

    console.log('filePath:', filePath, 'contributors:', attributes.contributors.length, 'lastUpdated:', lastUpdated);

  } catch (e) {
    console.log(e);
  }

  return parsedMarkdown;
}
