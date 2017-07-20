exports.config = {
  root: 'www',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'docs-page', 'demos-page'] },
    { components: ['stencil-router', 'stencil-route', 'stencil-route-link'] }
  ],
  collections: [
    { name: '@stencil/router' },
    { name: '@ionic/core' }
  ]
};
