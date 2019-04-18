import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      empty: false
    },
    {
      type: 'dist-hydrate-script',
      empty: false,
      dir: 'dist/prerender'
    }
  ],
  globalStyle: 'src/global/style/app.css',
  enableCache: false
};
