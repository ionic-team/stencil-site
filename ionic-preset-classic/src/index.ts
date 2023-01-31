/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  Preset,
  LoadContext,
  PluginConfig,
  PluginOptions,
} from '@docusaurus/types';
import type {Options, ThemeConfig} from './options';
import path from 'path';

function makePluginConfig(
  source: string,
  options?: PluginOptions,
): string | [string, PluginOptions] {
  if (options) {
    return [require.resolve(source), options];
  }
  return require.resolve(source);
}

export default function preset(
  context: LoadContext,
  opts: Options = {},
): Preset {
  const {siteConfig} = context;
  const {themeConfig} = siteConfig;
  const {algolia} = themeConfig as Partial<ThemeConfig>;
  const isProd = process.env.NODE_ENV === 'production';
  const {
    debug,
    docs,
    pages,
    sitemap,
    theme,
    googleTagManager,
    ...rest
  } = opts;

  const themes: PluginConfig[] = [];

  themes.push(makePluginConfig('@docusaurus/theme-classic', theme));
  if (algolia) {
    themes.push(require.resolve('@docusaurus/theme-search-algolia'));
  }

  //CUSTOM CODE
  themes.push(function () {
    return {
      name: 'ionic-theme-classic',
      getThemePath() {
        return path.resolve(__dirname, '../lib/theme');
      },
      getTypescriptThemePath() {
        return path.resolve(__dirname, '../src/theme');
      },
      getClientModules() {
        return [path.join(__dirname, '../src/styles/custom.scss')];
      }
  }})

  const plugins: PluginConfig[] = [];

  //CUSTOM CODE
  plugins.push(makePluginConfig('docusaurus-plugin-sass'));
  plugins.push(function() {
    return {
      name: 'docusaurus-cascade-layers',
      configurePostCss(postcssOptions) {
        postcssOptions.plugins.push(require('postcss-import'));
        postcssOptions.plugins.push(require('@csstools/postcss-cascade-layers'));
        return postcssOptions;
      },
    }
  })

  if (docs !== false) {
    plugins.push(makePluginConfig('@docusaurus/plugin-content-docs', docs));
  }
  if (pages !== false) {
    plugins.push(makePluginConfig('@docusaurus/plugin-content-pages', pages));
  }
  if (debug || (debug === undefined && !isProd)) {
    plugins.push(require.resolve('@docusaurus/plugin-debug'));
  }
  if (googleTagManager) {
    plugins.push(
      makePluginConfig('@docusaurus/plugin-google-tag-manager', googleTagManager),
    );
  }
  if (isProd && sitemap !== false) {
    plugins.push(makePluginConfig('@docusaurus/plugin-sitemap', sitemap));
  }
  if (Object.keys(rest).length > 0) {
    throw new Error(
      `Unrecognized keys ${Object.keys(rest).join(
        ', ',
      )} found in preset-classic configuration. The allowed keys are debug, docs, blog, pages, sitemap, theme, googleAnalytics, gtag. Check the documentation: https://docusaurus.io/docs/using-plugins#docusauruspreset-classic for more information on how to configure individual plugins.`,
    );
  }

  return {themes, plugins};
}

export type {Options, ThemeConfig};
