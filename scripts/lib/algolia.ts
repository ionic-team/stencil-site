import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';

dotenv.config();

const ALGOLIA_INDEX = process.env.ALGOLIA_INDEX;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

export function randomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function clearIndex() {
  const index = client.initIndex(ALGOLIA_INDEX);
  return index.clearObjects();
}

export async function updateRecords(records: any[]) {
  if (ALGOLIA_INDEX && ALGOLIA_APP_ID && ALGOLIA_ADMIN_KEY) {
    await clearIndex();
    records.map((record) => updateIndex(record));
  }
}

export async function updateIndex(data: any) {
  const index = client.initIndex(ALGOLIA_INDEX);

  const {
    title,
    description,
    url,
    content
  } = data;

  const objects = content.map((line: string) => ({
    objectID: randomString(),
    title,
    description,
    url,
    line
  }))

  index.setSettings({
    searchableAttributes: ['title', 'description', 'line']
  })

  return index.saveObjects(objects);
}
