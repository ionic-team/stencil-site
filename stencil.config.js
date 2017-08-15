exports.config = {
  publicPath: '/build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page'] },
    { components: ['app-marked', 'getting-started', 'basics-components','basics-routing','compiler-config', 'what-is', 'code-splitting', 'stencil-ssr', 'site-menu'] },
    { components: ['demos-page'] }
  ],
  collections: [
    { name: '@stencil/router'}
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
