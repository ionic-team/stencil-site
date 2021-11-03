import Prismic from '@prismicio/client';
import { promisify } from 'util';
import fs from 'fs';

const writeFile = promisify(fs.writeFile);

getIntegrations();

async function getIntegrations() {
  const DESTINATION_FILE = './src/assets/integrations.json';

  const results = [];

  let hasPages = false;
  let page = 0;

  try {
    do {
      page++;

      const { next_page, results: pageResults } =
        (await Prismic.client("https://ionicframeworkcom.prismic.io/api/v2").query(
          Prismic.Predicates.at('document.type', 'integration_stencil'),
          { pageSize: 100, page },
        )) || {};

      results.push(...pageResults);

      hasPages = !!next_page;
    } while (hasPages);
  } catch (e) {
    console.error('Unable to fetch documents', e);
  }

  const formedResults = results.map(result => docToIntegration(result));

  await writeFile(DESTINATION_FILE, JSON.stringify(formedResults, null, 2), {
    encoding: 'utf8'
  });
};

function docToIntegration({id, uid, data}) {
  const { name, categories, meta_title, meta_description, meta_image } = data;

  return {
    id,
    uid,
    name,
    categories,
    meta: {
      title: meta_title,
      description: meta_description,
      image: meta_image
    }
  }
}

