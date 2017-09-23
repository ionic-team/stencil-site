exports.config = {
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'lazy-iframe', 'site-menu'] },
    { components: ['app-marked', 'demos-page', 'resources-page', 'document-component'] }
  ],
  collections: [{ name: '@stencil/router' }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
