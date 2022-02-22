---
title: Versioning
description: Versioning
url: /docs/versioning
contributors:
- rwaskiewicz
---

# Versioning

Stencil follows the <a href="https://semver.org/" target="_blank">Semantic Versioning (SemVer)</a> convention:
<code>major.minor.patch.</code> Incompatible API changes increment the <code>major</code> version, adding 
backwards-compatible functionality increments the <code>minor</code> version, and backwards-compatible bug fixes
increment the <code>patch</code> version.

## Release Schedule

### Major Release

A major release will be published when there is a breaking change introduced in the API. Major releases will occur
roughly every **6 months** and may contain breaking changes. Release candidates will be published prior to a major
release in order to get feedback before the final release. An outline of what is changing and why will be included with
the release candidates.

### Minor Release

A minor release will be published when a new feature is added or API changes that are non-breaking are introduced.
We will heavily test any changes so that we are confident with the release, but with new code comes the potential for
new issues. Minor releases are scheduled to occur at least **once a month**, although this cadence may vary according to
team priorities.

### Patch Release

A patch release will be published when bug fixes were included, but the API has not changed and no breaking changes were
introduced.  Patch releases are scheduled to occur at least **once a month**, although this cadence may vary according
to team priorities. There may be times where patch releases need to released more often than scheduled.  To ensure patch
releases can fix existing code without introducing new issues from the new features, patch releases will always be
published prior to a minor release.

## Changelog

To see a list of all notable changes to Stencil, please refer to the 
<a href="https://github.com/ionic-team/stencil/releases" target="_blank" rel="noreferrer noopener">releases page</a>. This contains an ordered
list of all bug fixes and new features under each release.
