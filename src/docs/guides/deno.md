---
title: Running Stencil with Deno
description: Deno, A secure runtime for JavaScript and TypeScript.
url: /docs/deno
contributors:
  - adamdbradley
---

# Deno Runtime

_`EXPERIMENTAL`: It's early days yet for Deno and how Stencil will work with it, so we'll label this experimental._

Traditionally, Stencil and many of today's CLIs for the web ecosystem run on top of [Node](https://nodejs.org/). The Stencil compiler, however, is not locked down to only a Node environment, but rather it can execute from any JavaScript runtime, such as a browser main thread, web worker thread, or the latest JS runtime [Deno](https://deno.land/)! Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust. 

- [Deno Installation](https://deno.land/#installation)
- [Deno Manual](https://deno.land/manual)
- [Deno Runtime API](https://doc.deno.land/builtin/stable)

Stencil's architecture allows it to be passed a system (`sys`) that interacts with the runtime. For example, Node's `fs` will use `readdir()` and must be passed a callback, whereas Deno uses `readDir()` (has a capital D) and returns a promise. The same concept is applied to the browser and web worker systems, which allows the compiler to stay generic and versatile for any JS runtime.

## Installing Deno Stencil CLI

The Stencil compiler, and its Command-Line Interface (CLI), can also be executed with Deno, but it works differently than a traditional Node CLI. The biggest difference is that Deno does not have a centralized package manager, so Deno doesn't have an `npm` equivalent.

With Deno there is no `npm install` command, but instead you specify the external URL of the executable script to install. After [installing Deno](https://deno.land/#installation), run the command:

```bash
deno install -n stencil --allow-read --allow-write --allow-net https://stenciljs.com/cli.ts
```

Let's break this down a little further to explain what this command is doing:

| Command / Arg                  | Description |
|--------------------------------|---------------------------------------------------------------------------------|
| `deno`                         | The Deno command already [installed](https://deno.land/#installation)     .      |
| `install`                      | [Installer script](https://deno.land/manual/tools/script_installer) argument.    |
| `-n`                           | The name you'll give the executable your installing.                             |
| `stencil`                      | `stencil` is the name of the executable in this example, but can be customized to to whateve r you'd like.                         |
| `--allow-read`                 | The CLI will need to access files, so this option allows it to read local files. |
| `--allow-write`                | The CLI will also need to write files. |
| `--allow-net`                  | The CLI will need to access the net to install dependencies. |
| `https://stenciljs.com/cli.ts` | The location of the Stencil's Deno installer. |

Don't worry, this command doesn't need to be ran everytime you're running Stencil with Deno, but instead it's just installing it, and giving your machine the executable name of `stencil`. During the installing you'll see where additional script files are coming from, which in our case is `https://cdn.jsdelivr.net/npm/`.

After installing you'll then have the global `stencil` command ready to be used and you can test it out by running the CLI's help command:

```bash
stencil help
```

### Updating Deno Stencil CLI

To update the installed Deno Stencil CLI, add the `-f` option to "force" overwriting the existing executable and reinstalling the latest.

```bash
deno install -n stencil --allow-read --allow-write --allow-net -f https://stenciljs.com/cli.ts
```


## Running Deno Stencil CLI

After the installer script has successfully ran, the `stencil` executable is ready to be used with the same options as the Node CLI. See the [CLI docs](/docs/cli) for all available options or run `stencil help`.

Even though `stencil` is now a global executable, its goal is still aimed at running each individual application's local Stencil version. The installed command is simply the entry, but it's not locked into a specific compiler version. When the `stencil` command is ran, it looks to use the locally installed install Stencil compiler, and if one isn't already installed, it'll dynamically load the latest Stencil version.

_The Deno CLI is still experimental, the generate command has not been ported yet._
