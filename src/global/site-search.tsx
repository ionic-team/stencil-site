import algoliasearch from 'algoliasearch';

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY;
const ALGOLIA_INDEX = process.env.ALGOLIA_INDEX;

export function getSearchIndex() {
  if (ALGOLIA_INDEX && ALGOLIA_APP_ID && ALGOLIA_SEARCH_KEY) {
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
    const index = client.initIndex(ALGOLIA_INDEX);
    return index;
  }
  return null;
}
