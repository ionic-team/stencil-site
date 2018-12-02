import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  globalStyle: 'src/global/style/app.css',
  copy: [
    { src: 'robots.txt' }
  ]
};
