import { Config } from '@stencil/core';
import dotenvPlugin from 'rollup-plugin-dotenv';

export const config: Config = {
  taskQueue: 'async',
  buildEs5: true,
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    safari10: true,
    scriptDataOpts: true,
    shadowDomShim: true,
  },
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://stenciljs.com/',
      prerenderConfig: './prerender.config.ts',
      serviceWorker: {
        unregister: true,
      },
      copy: [
        { src: 'cli.ts.deno', dest: 'cli.ts' },
        { src: '../node_modules/@ionic-internal/ionic-ds/www/assets/fonts', dest: 'assets/fonts' },
      ],
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/prerender',
    },
  ],
  globalStyle: 'src/global/style/app.css',
  plugins: [dotenvPlugin()],
};
