// @ts-check

const path = require('path');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const HOSTNAME = 'stenciljs.com';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Stencil',
  tagline: 'Build. Customize. Distribute. Adopt.',
  url: `https://${HOSTNAME}`,
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: `https://${HOSTNAME}/favicon-32x32.png`,

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
            'https://github.com/ionic-team/stencil-site/tree/main',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          breadcrumbs: false,
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...props
          }) {
            const defaultSidebar = await defaultSidebarItemsGenerator(props);

            const EXCLUDE_TOP_LEVEL_IDS = ['build-variables', 'telemetry']

            // remove the items in `EXCLUDE_TOP_LEVEL_IDS`, which may exist in 1+ subdirectories for versioned docs
            // note: this removes any `EXCLUDE_TOP_LEVEL_IDS` entry for _all_ versioned docs and the top level `./docs`
            const filteredSidebar = defaultSidebar.filter((item) =>
               !EXCLUDE_TOP_LEVEL_IDS.find((toExclude) => item.id?.match(`.*${toExclude}$`))
            );

            return filteredSidebar;
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        googleTagManager: {
          containerId: 'GTM-TKMGCBC',
        },
      }),
    ]
  ],

  plugins: [
    ['docusaurus-plugin-module-alias',
      {
        alias: {
          react: path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
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
          href: `https://${HOSTNAME}`,
          target: '_self',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
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
          {href: `https://${HOSTNAME}/resources`, target: '_self', label: 'Resources', position: 'right'},
          {
            type: 'html',
            position: 'right',
            value: '<div class="navbar__separator"></div>',
          },
          {
            href: 'https://github.com/stencil-community',
            label: 'Community',
            position: 'right',
          },
          {
            href: 'https://ionic.io/blog/tag/stencil',
            label: 'Blog',
            position: 'right',
          },
          {
            type: 'html',
            position: 'right',
            value: '<div class="navbar__separator"></div>',
          },
          {
            type: 'html',
            position: 'right',
            value: '<a href="https://stenciljs.jp/docs/introduction" target="_blank" rel="noopener" class="navbar__icon translation"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="none"><path stroke="#03060B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.5 3h12.12M7.56 1v2M10.92 17l4.04-9.33L19 17M12.16 14.33h5.6M11.31 3S10.3 6.92 7.85 9.88c-2.44 2.95-5 4.45-5 4.45"/><path stroke="#03060B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.25 12.33s-1.47-1.12-3.03-3.12c-1.56-2-2.35-3.54-2.35-3.54"/></svg></a>',
          },
          {
            type: 'html',
            position: 'right',
            value: '<a href="https://twitter.com/stenciljs" target="_blank" rel="noopener" class="navbar__icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none"><path fill="#03060B" d="M18 1.9c-.68.32-1.39.54-2.12.63A4 4 0 0 0 17.5.3c-.72.47-1.52.8-2.34.98-.35-.4-.77-.73-1.23-.95A3.4 3.4 0 0 0 12.46 0c-2.04 0-3.7 1.8-3.7 4.04 0 .3.04.62.1.92a9.7 9.7 0 0 1-4.2-1.22 10.8 10.8 0 0 1-3.4-3c-.34.61-.5 1.31-.51 2.03 0 1.4.66 2.63 1.65 3.36a3.38 3.38 0 0 1-1.68-.5v.04a3.97 3.97 0 0 0 2.96 3.96 3.42 3.42 0 0 1-1.66.07 3.76 3.76 0 0 0 3.45 2.8A7.01 7.01 0 0 1 0 14.18 9.7 9.7 0 0 0 5.65 16c6.8 0 10.52-6.15 10.52-11.5L16.16 4A7.94 7.94 0 0 0 18 1.89Z"/></svg></a>',
          },
          {
            type: 'html',
            position: 'right',
            value: '<a href="https://github.com/ionic-team/stencil" target="_blank" rel="noopener" class="navbar__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="#03060B" d="M8 0a8.1 8.1 0 0 0-8 8.2c0 3.63 2.3 6.7 5.47 7.79l.14.01c.3 0 .4-.22.4-.4v-1.4c-.3.06-.57.1-.81.1-1.54 0-1.89-1.2-1.89-1.2-.36-.95-.89-1.2-.89-1.2-.7-.5 0-.5.05-.5.8.06 1.23.84 1.23.84.4.7.94.9 1.41.9.38 0 .72-.12.92-.21.07-.53.28-.9.5-1.1-1.77-.2-3.64-.91-3.64-4.05 0-.9.31-1.63.82-2.2-.08-.21-.35-1.05.08-2.18l.18-.01c.3 0 .94.1 2.02.86a7.5 7.5 0 0 1 4.01 0c1.08-.75 1.73-.86 2.02-.86l.18.01c.44 1.13.16 1.97.08 2.18.5.57.82 1.3.82 2.2 0 3.15-1.87 3.84-3.65 4.04.28.25.54.75.54 1.52l-.01 2.25c0 .2.1.41.4.41l.15-.01A8.19 8.19 0 0 0 16 8.2 8.1 8.1 0 0 0 8 0Z"/></svg></a>',
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
      image: `https://${HOSTNAME}/stencil-og.png`,
    }),
};

module.exports = config;
