const sass = require('@stencil/sass');

exports.config = {
  plugins: [
    sass()
  ],
  outputTarget: [
    {
      type: 'www',
      serviceWorker: false
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
