---
title: Support Policy
description: Support Policy
url: /docs/support-policy
contributors:
- rwaskiewicz
---

# Support Policy

## Community Maintenance

The Stencil is a 100% open source (MIT) project. Developers can ensure Stencil is the right choice for building web 
components through Ionic’s community maintenance strategy. The Stencil team regularly ships new releases, bug fixes, and 
is welcoming to community pull requests.

## Stencil Maintenance and Support Status

Given the reality of time and resource restraints as well as the desire to keep innovating in the frontend development
space, over time it becomes necessary for the Stencil team to shift focus to newer versions of the library. However,
the Stencil team will do everything it can to make the transition to newer versions as smooth as possible. The Stencil
team recommends updating to the newest version of the Stencil for the latest features, improvements and stability 
updates.

The current status of each Stencil version is:

| Version |     Status     |   Released   | Maintenance Ends | Ext. Support Ends |
|:-------:|:--------------:|:------------:|:----------------:|:-----------------:|
|   V2    |   **Active**   | Aug 08, 2020 |       TBD        |        TBD        |
|   V1    | End of Support | Jun 03, 2019 |   Aug 08, 2020   |   Aug 08, 2020    |

**Maintenance Period**: Only critical bug and security fixes. No major feature improvements.

**Extended Support Period**: For teams and organizations that require additional long term support, Ionic has extended 
support options available. To learn more, see our 
[Enterprise offerings](https://ionicframework.com/sales?product_of_interest=Design%20Systems).

### Stencil Support Details

Starting with Stencil v2, the Stencil team is adopting a newly revised maintenance policy. When a new major version of
Stencil is released, the previous major version release will enter maintenance mode. While during the maintenance
period, only critical bug and security fixes will be applied. No major feature improvements added will be added to
versions in maintenance mode. The maintenance period shall **TODO: last three months**. Once the maintenance period has ended for
version of Stencil, that version enters the extended support period. During the extended support period, only critical 
bug and security fixes will be applied for teams and organizations using Stencil's Enterprise offerings. The extended 
support period **TODO lasts for X months**.

The table below describes the timeline of various versions of Stencil

| Version |        Status         |   Released   | Maintenance Ends | Ext. Support Ends |
|:-------:|:---------------------:|:------------:|:----------------:|:-----------------:|
|    D    |        Active         | Jan 01, 2022 |       TBD        |        TBD        |
|    C    |      Maintenance      | Jul 07, 2021 |       TBD        |        TBD        |
|    B    | Extended Support Only | Jan 01, 2021 |       TBD        |        TBD        |
|    A    |    End of Support     | Jul 07, 2020 |   Aug 08, 2020   |   Aug 08, 2020    |

## Compatability Recommendations

Stencil is in many regards an opinionated library, and includes much of the software necessary to get users building
web components as quickly as possible. There are a few pieces of software that Stencil allows users to choose to best
fit their team, organizational structure, and existing technical stack. The Stencil team has compiled a series of
compatability tables to describe the interoperability requirements of these pieces of software and Stencil.

### JavaScript Runtime

| Stencil Version | Node v10 | Node v12 | Node v14 | Node v16 | Node v18 |  Deno*  |
|:---------------:|:--------:|:--------:|:--------:|:--------:|:--------:|:-------:|
|       V2        | &#10060; | &#9989;  | &#9989;  | &#9989;  | &#10060; | &#9888; |
|       V1        | &#9989;  | &#9989;  | &#9989;  | &#9989;  | &#10060; | &#9888; |

\* Experimental Deno support was available in Stencil
[v1.16.0](https://github.com/ionic-team/stencil/releases/tag/v1.16.0) through
[v2.8.1](https://github.com/ionic-team/stencil/releases/tag/v2.8.1). This experimental support was removed in 
[v2.9.0](https://github.com/ionic-team/stencil/releases/tag/v2.9.0). For additional reasoning behind this decision, 
please see [this document](https://github.com/ionic-team/stencil/blob/main/docs/adr/0013-deno-removal.md).

### Testing Libraries

#### Jest

| Stencil Version | Jest v24 | Jest v25 | Jest v26 | Jest v27 |
|:---------------:|:--------:|:--------:|:--------:|:--------:|
|       V2        | &#9989;  | &#9989;  | &#9989;  | &#9989;  |
|       V1        | &#9989;  | &#9989;  | &#9989;  | &#10060; |

#### Puppeteer

| Stencil Version | Puppeteer v5 | Puppeteer v6 | Puppeteer v7 | Puppeteer v8 | Puppeteer v9 | Puppeteer v10 |
|:---------------:|:------------:|:------------:|:------------:|:------------:|:------------:|:-------------:|
|       V2        |   &#9989;    |   &#9989;    |   &#9989;    |   &#9989;    |   &#9989;    |    &#9989;    |
|       V1        |   &#9989;    |   &#9989;    |   &#9989;    |   &#9989;    |   &#9989;    |   &#10060;    |