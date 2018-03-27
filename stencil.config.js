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
  globalStyle: 'src/global/variables.css',
  copy: [
    { src: 'docs-content/' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
