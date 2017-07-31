exports.config = {
  publicPath: 'build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'stencil-router', 'stencil-route', 'stencil-route-link'] },
    { components: ['docs-page', 'demos-page', 'getting-started'] },
  ],
  collections: [
    { name: '@ionic/core' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
