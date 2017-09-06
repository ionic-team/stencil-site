exports.config = {
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'youtube-video', 'site-menu'] },
    { components: ['app-marked'] },
    { components: ['demos-page', 'document-component'] }
  ],
  collections: [{ name: '@stencil/router' }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
