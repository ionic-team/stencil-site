---
title: Web Workers
description: Web Workers
url: /docs/web-workers
---

# Web Workers

> **EXPERIMENTAL:** only available in `@stencil/core` 1.9.0-4 or up.

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are a widely supported technology (Chrome, Firefox, Safari, Edge and IE11) that allows to run JS in a different thread, maximizing the usage of multiple CPUs; but most importantly not blocking the **main thread**.

The **main thread** is where Javascript runs by default, it has access to the DOM and other visual APIs, the problem is that long running JS prevents the browser from running animations (CSS animations, transitions, canvas, svg...), making your site to look frozen. That's why if your application needs to run CPU-intensive tasks, Web Workers will be a great help.


## When to use them?

First thing to understand is when to use a Web Workers or not, since it comes with a set of costs and limitations:

- You can't access the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).
- You can't access any of the `@stencil/core` API, or use or declare a component.
- Isolated state (each worker has their own memory space).
- Big overhead passing data back and forward between workers and main thread.
- Communication is always asynchronous.
- You can **only** pass primitives and objects that implement the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) objects.

This is why you should try to:

- Use pure and functional algorithms in workers. `(input1, input2) => output`
- Never pass class instances or functions.
- Minimize passing data back and forward.
- Minimize state within the worker (don't put redux inside a worker!).
- The cost of a worker will be easily amortized because you will be doing some CPU-intensive work.


## How vanilla Web Workers "work"?

Web Workers comes with a `Worker` API, that works the following way:

```tsx
const worker = new Worker('/my-worker.js');
worker.postMessage(['send message to worker']);
worker.onmessage = (event) => {
  console.log('data from worker', data);
};
```

This API, while powerful, is very low level and makes it hard to write complex apps, since the event-driven paradigm leads easily to [spaghetti-code](https://en.wikipedia.org/wiki/Spaghetti_code).

For further information, check out [this fantastic tutorial](https://www.html5rocks.com/en/tutorials/workers/basics/) by our friends at HTML5Rocks.

It also requires of the generation of a different chunk of JS, the `my-worker.js` in the example above. This means you usually need extra tooling that transpiles and bundles the worker entry point into another `.js` file.

Fortunately Stencil can help you solve these two problems: the tooling problem and the communication problem.

## Workers in Stencil

As we already mention, Stencil's compiler can help you to use workers in production seamlessly. Stencil automatically run `.ts` files in **your** project (ie, within the `src` folder) inside a Web Worker if it has the `.worker.ts` extension. Here's an example:

**src/stuff.worker.ts:**

```tsx

export const sum = async (a: number, b: number) => {
  return a + b;
}

export const expensiveTask = async (buffer: ArrayBuffer) => {
  for (let i = 0; i < buffer.length; i++) {
    // do a lot of processing
  }
  return buffer;
};
```

**src/my-app/my-app.tsx:**
```tsx
import { Component } from '@stencil/core';

// Import worker directly
// Stencil will automatically create a proxy and run the module in a worker
import { sum, expensiveTask} from '../../stuff.worker';

@Component({
  tag: 'my-cmp'
}
export class MyApp {

  async componentWillLoad() {
    // sum() will run inside a worker! and the result is a Promise<number>
    const result = await sum(1, 2);
    console.log(result); // 3

    // expensiveTask() will not block the main thread,
    // because it runs in parallel inside the worker
    const newBuffer = await expensiveTask(buffer);
    console.log(newBuffer);
  }
}
```


Under the hood, stencil compiles a worker file, and uses the standard `new Worker()` API to instantiate the worker, then it creates proxies for each of the exported functions, so developers can interact with it using [structured programming constructs](https://en.wikipedia.org/wiki/Structured_programming) instead of event-based ones.

> Workers are already placed in a different chunk, and dynamically loaded using `new Worker()`, you should not use a dynamic `import()` to load them, understand the ESM is only loading the proxies.

### Imports within a worker

Normal `ESM` imports are possible when building workers in stencil. Under the hood, the compiler bundles all the dependencies of a worker into a single file that becomes the worker's entry-point, a dependency-free file that can run without problems.

**src/loader.worker.ts:**

```tsx
import upngjs from 'upng-js';
import { Images } from './materials';

export const loadTexture = async (imagesSrcs: Images) => {
  const images = await Promise.all(
    imagesSrcs.map(loadOriginalImage)
  );
  return images;
}

async function loadOriginalImage(src: string) {
  const res = await fetch(src);
  const png = upngjs.decode(await res.arrayBuffer());
  return png;
}
```

In this example, we are building a worker called `loader.worker.ts` that imports an NPM dependency (`upngjs`, used to parse png files), and a local module (`./materials`). Stencil will use [rollup](https://rollupjs.org/guide/en/) to bundle all this dependencies and remove all imports at runtime, notice that code will be duplicated if used inside and outside a worker.

#### Dynamic imports

In order to load dynamically, Web Workers come with a handy API, [`importScript()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts).

Here's an example of how to use `comlink` directly from the CDN.
```tsx
importScripts("https://cdn.jsdelivr.net/npm/comlinkjs/comlink.global.min.js");
```

> Do not use `importScript()` to load dependencies you previously installed using `npm` or `yarn`. Use normal ESM imports as usual, so the bundler can understand it.

### Advanced cases

Sometimes it might be necessary to access the actual [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) instance, because manual usage of the [`postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) and [`onmessage`](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/onmessage) is desired, in that case stencil also has an API that exposes that, so it can be used instead of the proxies mentioned early.

In this case, we just have to add `?worker` at the end of a ESM import, this virtual module will export:
- `worker`: The actual Worker instance.
- `workerPath`: The path to the worker's entry-point (usually a path to a `.js` file).
- `workerName`: The name of the worker, useful for debugging purposes.


**src/my-app/my-app.tsx:**

```tsx
import { Component } from '@stencil/core';
import { sum } from '../../stuff.worker';

// Using the ?worker query, allows to access the worker instance directly.
import { worker } from '../../stuff.worker.ts?worker';

@Component({
  tag: 'my-cmp'
}
export class MyApp {

  componentWillLoad() {
    // Use worker api directly
    worker.postMessage(['send data manually']);

    // Use the proxy
    const result = await sum(1, 2);
    console.log(result); // 3
  }
}
```

You can even use this feature you create multiple Worker manually:

```tsx
import { workerPath } from '../../stuff.worker.ts?worker';

const workerPool = [
  new Worker(workerPath),
  new Worker(workerPath),
  new Worker(workerPath),
  new Worker(workerPath),
];
```

In this example, we exclusively take advantage of the bundling performed by the compiler to obtain the `workerPath` to the worker's entry point, then manually create a pool of workers.

>Stencil will not instantiate a worker if it's unused, it takes advantage of tree-shaking to do this.


#### Worker Termination

Any Web Workers can be terminated using the [`Worker.terminate()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate) API, but since Stencil creates one worker shared across all the proxied methods, it's not a recommended to terminate it manually. If you have a use case for using terminate and rebuilding workers, then we recommend using the Worker API directly:

```tsx
import { workerPath } from '../../stuff.worker.ts?worker';
const worker = new Worker(workerPath);
// ...
worker.terminate()
```



