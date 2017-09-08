exports.config = {
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page', 'youtube-video', 'site-menu'] },
    { components: ['app-marked'] },
    { components: ['demos-page', 'document-component'] }
  ],
  collections: [{ name: '@stencil/router' }],
  serviceWorker: {
    globPatterns: [
      '**/*.{js,css,json,ico,png,svg}'
    ],
    runtimeCaching: [
      {
        urlPattern: /docs/,
        handler: 'networkFirst'
      }
    ]
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
