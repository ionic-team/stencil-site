# Contributing

Thanks for your interest in contributing to the Stencil Docs! :tada:


## Creating an Issue

* If you have a question about using Stencil, please ask in the [Stencil Worldwide Slack](https://join.slack.com/t/stencil-worldwide/shared_invite/enQtMjQ2MzkyMTY0MTk0LTQ4ODgzYjFjNjdkNDY3YWVhMmNlMTljMWQxNTM3Yjg0ZTIyZTM1MmU2YWE5YzNjNzE1MmQ3ZTk2NjQ1YzM5ZDM) group.

* It is required that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

* The issue list of this repository is exclusively for bug reports, docs issues and feature requests. Non-conforming issues will be closed immediately.

* Issues with no clear steps to reproduce will not be triaged. If an issue is labeled with "needs reply" and receives no further replies from the author of the issue for more than 5 days, it will be closed.

* If you think you have found a bug, or have a new feature idea, please start by making sure it hasn't already been [reported](https://github.com/ionic-team/stencil-site/issues). You can search through existing issues to see if there is a similar one reported. Include closed issues as it may have been closed with a solution.

* Next, [create a new issue](https://github.com/ionic-team/stencil-site/issues/new) that thoroughly explains the problem.

## Creating a Pull Request

* We appreciate you taking the time to contribute! Before submitting a pull request, we ask that you please [create an issue](#creating-an-issue) that explains the bug, docs issue, or feature request and let us know that you plan on creating a pull request for it. If an issue already exists, please comment on that issue letting us know you would like to submit a pull request for it. This helps us to keep track of the pull request and make sure there isn't duplicated effort.

* Looking for an issue to fix? Make sure to look through our issues with the [help wanted](https://github.com/ionic-team/stencil-site/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) label!

### Setup

1. Fork the repo.
2. Clone your fork.
3. Make a branch for your change.
4. Run `npm install` (make sure you have [node](https://nodejs.org/en/) and [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) installed first).
5. Run `npm run build` to build the documentation files.
6. Run `npm run serve` to serve the built site.

#### Directory Structure

This repository contains versioned documentation for Stencil.
Starting with Stencil v3.0, a new "version" of the doc is created for every minor version.
These docs are found in the [`./version_docs`](./versioned_docs) directory.
Each subdirectory corresponds to a version of the docs site that can be viewed in the Stencil Docs site.

```
versioned_docs
├── version-v2    <- All docs for Stencil version 2
├── version-v3.0  <- All docs for Stencil version 3.0, including patch versions (e.g. 3.0.1)
├── version-v3.1  <- All docs for Stencil version 3.1, including patch versions (e.g. 3.1.1)
└── etc.
```

The "next", or "upcoming" version of the docs can be found in the [`./docs`](./docs) directory.
When it comes time to release a new minor version of Stencil, the contents of `./docs` will be copied to a new directory under the [`./version_docs`](./versioned_docs) directory with that version's name.

#### Adding Documentation

1. To add documentation first create a new markdown file under `./versioned_docs/[version_of_docs_to_change]` in the folder that fits your doc best.
   1. For example, if your doc is a guide for Stencil v3.0, you would put it in `./versioned_docs/version-v3.0/guides`.
   2. Depending on the nature of the documentation, the Stencil team may wish to "port" this change to other versions of the Stencil documentation. During a review of your PR, the team will be able to give guidance how to propagate this change.
2. Write your documentation following the style in the other docs markdown files. Try to aim for being as clear and concise as possible. We recommend checking out the [vue.js docs](https://vuejs.org/) for examples of good docs.
3. Make sure the page header contains title, description, url and contributors. See other docs files for examples.
4. Run `npm run build` then start the app with `npm run serve`. You should see your new page in the table of contents and be able to access it.

#### Modifying documentation

1. Locate the doc you want to modify in `./versioned_docs/[version_of_docs_to_change]`.
   1. For example, if you wish to make changes to the Stencil v3.0 docs, you would make the change under `./versioned_docs/version-v3.0` .
   2. Depending on the nature of the documentation, the Stencil team may wish to "port" this change to other versions of the Stencil documentation. During a review of your PR, the team will be able to give guidance how to propagate this change.
2. Modify the documentation, making sure to keep the format the same as the rest of the doc.
3. Run `npm run build` then start the app with `npm run serve`. You should see your new page in the table of contents and be able to access it.

Alternatively, modify documentation through the GitHub interface.

## Commit Message Format

We have very precise rules over how our git commit messages should be formatted. This leads to readable messages that are easy to follow when looking through the project history.

`type(scope): subject`

#### Type
Should be `docs`

#### Scope
The scope can be anything specifying the place of the commit change. For example `props`, `angular`, etc. If you make multiple commits for the same doc, please keep the naming of this doc consistent. For example, if you make a change to the `@Prop` docs and the first commit is `docs(prop)`, you should continue to use `prop` for any more commits related to navigation.

#### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* do not capitalize first letter
* do not place a period `.` at the end
* entire length of the commit message must not go over 50 characters
* describe what the commit does, not what issue it relates to or fixes
* **be brief, yet descriptive** - we should have a good understanding of what the commit does by reading the subject


## License

By contributing your code to the ionic-team/stencil-site GitHub Repository, you agree to license your contribution under the MIT license.
