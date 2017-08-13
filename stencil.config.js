exports.config = {
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'stencil-router', 'stencil-route-link', 'stencil-route'] },
    { components: ['app-marked', 'getting-started', 'basics-components', 'compiler-config', 'what-is', 'code-splitting', 'stencil-ssr', 'site-menu'] },
    { components: ['demos-page'] }
  ],
  collections: [
    /*{ name: '@stencil/router'}*/
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
