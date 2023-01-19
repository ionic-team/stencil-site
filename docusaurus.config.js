// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Stencil',
  tagline: 'A powerful toolchain for building Progressive Web Apps and Design Systems',
  url: 'https://stenciljs.com',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'icon/favicon.ico',

  organizationName: 'ionic-team',
  projectName: 'stencil-site',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    {
      src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js",
      async: true,
    }
  ],

  presets: [
    [
      '@ionic-internal/preset-classic',
      /** @type {import('@ionic-internal/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/ionic-team/stencil-site/tree/master/src',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          breadcrumbs: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ]
  ],

  plugins: [
    ['docusaurus-plugin-module-alias',
      {
        alias: {
          react: require.resolve('react'),
          'react-dom': require.resolve('react-dom'),
        },
      }
    ]
  ],

  themeConfig:
    /** @type {import('@ionic-internal/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: false,
        logo: {
          alt: 'Stencil Logo',
          src: 'img/logo-dark.svg',
          srcDark: "img/logo-light.svg",
        },
        items: [
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'introduction/overview',
            position: 'right',
            label: 'Docs',
          },
          {to: 'resources', label: 'Resources', position: 'right'},
          {
            href: 'https://ionicframework.com/blog/tag/stencil/',
            label: 'Blog',
            position: 'right',
          },
          {
            href: 'https://ionic.io/products/stencil',
            label: 'Enterprise',
            position: 'right',
          },
          {
            href: 'https://github.com/ionic-team/stencil',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['jsx', 'tsx', 'bash', 'typescript', 'javascript', 'markup', 'css', 'json', 'diff']
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'BH4D9OD16A',
  
        // Public API key: it is safe to commit it
        apiKey: '6399791d239c7e56a6b47685a64f8873',
  
        indexName: 'stenciljs',
  
        // Optional: see doc section below
        contextualSearch: true,
      },
    }),
};

module.exports = config;
