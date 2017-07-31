exports.config = {
  publicPath: 'build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'docs-page', 'demos-page', 'getting-started'] },
    { components: ['stencil-router', 'stencil-route', 'stencil-route-link'] }
  ],
  collections: [
    { name: '@ionic/core' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
