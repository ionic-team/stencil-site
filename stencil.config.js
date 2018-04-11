const sass = require('@stencil/sass');

exports.config = {
  plugins: [
    sass()
  ],
  outputTarget: [
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
    { src: 'docs-content/' }
  ],
  enableCache: false
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
