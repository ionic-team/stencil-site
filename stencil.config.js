exports.config = {
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'youtube-video', 'site-menu'] },
    { components: ['app-marked'] },
    { components: ['demos-page', 'document-component'] }
  ],
  collections: [{ name: '@stencil/router' }],
  copy: {
    sw: {
      src: 'sw.js'
    },
    workboxJs: {
      src: 'workbox-sw.prod.v1.3.0.js'
    },
    workboxMap: {
      src: 'workbox-sw.prod.v1.3.0.js.map'
    }
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
