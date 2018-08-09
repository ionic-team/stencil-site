const sass = require('@stencil/sass');

exports.config = {
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

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
