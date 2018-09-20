import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  plugins: [
    sass()
  ],
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js',
        globPatterns: [
          '**/*.{html,js,css,json,ico,png}'
        ]
      }
    }
  ],
  globalStyle: 'src/global/style.scss',
  copy: [
    { src: 'docs-content/' },
    { src: 'robots.txt' }
  ]
};
