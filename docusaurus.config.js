// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Stencil',
  tagline: 'A powerful toolchain for building Progressive Web Apps and Design Systems',
  url: 'https://stenciljs.com',
  baseUrl: '/',
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
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/ionic-team/stencil-site/edit/master/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'Stencil Logo',
          src: 'img/logo.svg',
          srcDark: "img/logo-white.svg",
        },
        items: [
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
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Ionic`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
