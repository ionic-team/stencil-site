// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/overview',
        'introduction/goals-and-objectives',
        'introduction/getting-started',
        'introduction/my-first-component',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/api',
        'components/component',
        'components/component-lifecycle',
        'components/properties',
        'components/state',
        'components/reactive-data',
        'components/templating-and-jsx',
        'components/events',
        'components/methods',
        'components/host-element',
        'components/styling',
        'components/functional-components',
      ],
    },
    {
      type: 'category',
      label: 'Framework Integrations',
      items: [
        'framework-integration/overview',
        'framework-integration/bindings',
        'framework-integration/angular',
        'framework-integration/react',
        'framework-integration/vue',
        'framework-integration/ember',
        'framework-integration/javascript',
      ],
    },
    {
      type: 'category',
      label: 'Static Site Generation',
      items: [
        'static-site-generation/overview',
        'static-site-generation/prerender-config',
        'static-site-generation/basics',
        'static-site-generation/debugging',
        'static-site-generation/meta',
        'static-site-generation/server-side-rendering-ssr',
        'static-site-generation/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Config',
      items: ['config/overview', 'config/dev-server', 'config/plugins', 'config/extras', 'config/cli'],
    },
    {
      type: 'category',
      label: 'Output Targets',
      items: [
        'output-targets/overview',
        'output-targets/dist',
        'output-targets/custom-elements',
        'output-targets/custom-elements-bundle',
        'output-targets/www',
        'output-targets/docs-stats',
        'output-targets/docs-readme',
        'output-targets/docs-json',
        'output-targets/docs-custom',
        'output-targets/copy-tasks',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/assets',
        'guides/module-bundling',
        'guides/design-systems',
        'guides/forms',
        'guides/hydrate-app',
        'guides/publishing',
        'guides/service-workers',
        'guides/store',
        'guides/style-guide',
        'guides/typed-components',
        'guides/workers',
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      items: [
        'testing/overview',
        'testing/config',
        'testing/unit-testing',
        'testing/e2e-testing',
        'testing/mocking',
        'testing/screenshot-visual-diff',
        'testing/screenshot-connector',
      ],
    },
    {
      type: 'category',
      label: 'Core Compiler API',
      items: ['core/compiler-api', 'core/cli-api', 'core/dev-server-api'],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        {
          type: 'link',
          label: 'Stencil on Twitter',
          href: 'https://twitter.com/stenciljs',
        },
        {
          type: 'link',
          label: 'Stencil on Slack',
          href: 'https://stencil-worldwide.herokuapp.com/',
        },
        {
          type: 'link',
          label: 'Stencil on GitHub',
          href: 'https://github.com/ionic-team/stencil',
        },
      ],
    },
    {
      type: 'category',
      label: 'Legal',
      items: [
        'telemetry',
        {
          type: 'link',
          label: 'Privacy Policy',
          href: 'https://ionicframework.com/privacy',
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: ['reference/support-policy', 'reference/versioning', 'reference/browser-support', 'reference/faq'],
    },
  ],
};

module.exports = sidebars;
