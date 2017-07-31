exports.config = {
  publicPath: 'build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page'] },
    { components: ['docs-page', 'demos-page', 'getting-started'] },
  ],
  collections: [
    { name: '@ionic/core' },
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
