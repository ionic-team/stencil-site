exports.config = {
  publicPath: '/build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'youtube-video'] },
    { components: ['app-marked', 'site-menu'] },
    { components: ['demos-page', 'document-component'] }
  ],
  collections: [{ name: '@stencil/router' }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
