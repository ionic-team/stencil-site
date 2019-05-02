module.exports = {
  robotsTxt(opts) {
    return `
User-agent: *
Disallow: /
Sitemap: ${opts.sitemapUrl}
`
  }
}