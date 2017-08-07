exports.config = {
  publicPath: 'build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'stencil-router', 'stencil-route-link', 'stencil-route'] },
    { components: ['docs-page', 'demos-page', 'app-marked', 'getting-started', 'basics-components', 'compiler-config', 'what-is', 'site-menu'] },
    /*{ components: ['getting-started'] },
    { components: ['what-is'] }*/
  ],
  collections: [
    { name: '@ionic/core' }/*,
    { name: '@stencil/router'}*/
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
