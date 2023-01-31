"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
function makePluginConfig(source, options) {
    if (options) {
        return [require.resolve(source), options];
    }
    return require.resolve(source);
}
function preset(context, opts) {
    if (opts === void 0) { opts = {}; }
    var siteConfig = context.siteConfig;
    var themeConfig = siteConfig.themeConfig;
    var algolia = themeConfig.algolia;
    var isProd = process.env.NODE_ENV === 'production';
    var debug = opts.debug, docs = opts.docs, pages = opts.pages, sitemap = opts.sitemap, theme = opts.theme, googleTagManager = opts.googleTagManager, rest = __rest(opts, ["debug", "docs", "pages", "sitemap", "theme", "googleTagManager"]);
    var themes = [];
    themes.push(makePluginConfig('@docusaurus/theme-classic', theme));
    if (algolia) {
        themes.push(require.resolve('@docusaurus/theme-search-algolia'));
    }
    //CUSTOM CODE
    themes.push(function () {
        return {
            name: 'ionic-theme-classic',
            getThemePath: function () {
                return path_1["default"].resolve(__dirname, '../lib/theme');
            },
            getTypescriptThemePath: function () {
                return path_1["default"].resolve(__dirname, '../src/theme');
            },
            getClientModules: function () {
                return [path_1["default"].join(__dirname, '../src/styles/custom.scss')];
            }
        };
    });
    var plugins = [];
    //CUSTOM CODE
    plugins.push(makePluginConfig('docusaurus-plugin-sass'));
    plugins.push(function () {
        return {
            name: 'docusaurus-cascade-layers',
            configurePostCss: function (postcssOptions) {
                postcssOptions.plugins.push(require('postcss-import'));
                postcssOptions.plugins.push(require('@csstools/postcss-cascade-layers'));
                return postcssOptions;
            }
        };
    });
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
        plugins.push(makePluginConfig('@docusaurus/plugin-google-tag-manager', googleTagManager));
    }
    if (isProd && sitemap !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-sitemap', sitemap));
    }
    if (Object.keys(rest).length > 0) {
        throw new Error("Unrecognized keys ".concat(Object.keys(rest).join(', '), " found in preset-classic configuration. The allowed keys are debug, docs, blog, pages, sitemap, theme, googleAnalytics, gtag. Check the documentation: https://docusaurus.io/docs/using-plugins#docusauruspreset-classic for more information on how to configure individual plugins."));
    }
    return { themes: themes, plugins: plugins };
}
exports["default"] = preset;
