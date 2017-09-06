exports.config = {
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'youtube-video', 'site-menu'] },
    { components: ['app-marked'] },
    { components: ['demos-page', 'document-component'] }
  ],
  collections: [{ name: '@stencil/router' }],
  copy: {
    manifest: {
      src: 'manifest.json'
    }
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
