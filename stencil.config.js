const sass = require('@stencil/sass');

exports.config = {
  plugins: [
    sass()
  ],
  globalStyle: 'src/global/variables.css',
  serviceWorker: {
    swSrc: 'src/sw.js',
    globPatterns: [
      '**/*.{html,js,css,json,ico,png}'
    ]
  },
  copy: [
    {src: 'docs-content/'}
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
