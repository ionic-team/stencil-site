---
title: Web Workers
description: Web Workers
url: /docs/web-workers
---

# Web Workers

> **EXPERIMENTAL:** only available in `@stencil/core` 1.9.0-4 or up.

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are a widely supported (Chrome, Firefox, Safari, Edge and IE11) technology that allows to run JS in a different thread, maximizing the usage of multiple CPUs, but most importantly not blocking the **main thread**.

The **main thread** is where Javascript runs by default, it has access to the DOM and other visual APIs, the problem is that long running JS prevents the browser for running animations (CSS animations, transitions, canvas, svg...), making it look like it's frozen. That's why if your application needs to run CPU-intensive JS, Web Workers is your best friend.


## When to use them?

Web Workers come with several costs:

- You can't access the dom.
- You can't access any of the `@stencil/core` API, or use or declare a component.
- Isolated state (each worker has their own memory space).
- Big overhead passing data back and forward between workers and main thread.
- Communication is always asynchronous.
- You can only pass primitives and objects that implement the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) objects.

This is why you should try to:

- Use pure and functional algorithms in workers. `(input1, input2) => output`
- Minimize passing data back and forward
- Minimize state within the worker (don't put redux inside a worker)


## How does workers "work"?

Web Workers comes with a `Worker` API, that works the following way:

```tsx
const worker = new Worker('/my-worker.js');
worker.postMessage(['send message to worker']);
worker.onmessage = (event) => {
  console.log('data from worker', data);
};
```

This API, while powerful, is very low level and makes it hard to write complex apps, since the event-driven paradigm leads easily to [spaghetti-code](https://en.wikipedia.org/wiki/Spaghetti_code).

It also requires of the generation of a different chunk of JS, the `my-worker.js` in the example above. This means you usually need extra-tooling that transpiles the worker entry point a generates another `.js` file.

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
import { sum, expensiveTask} from '../../stuff.worker.ts';

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


### Advanced cases

Sometimes it might be necessary to access the actual [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) instance, because manual usage of the [`postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) and [`onmessage`](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/onmessage) is desired, in that case stencil also has an API that exposes that, so it can be used instead of the proxies mentioned early.

In this case, we just have to add `?worker` at the end of a ESM import, this virtual module will export:
- `worker`: The actual Worker instance.
- `workerPath`: The path to the worker's entry-point (usually a path to a `.js` file).
- `workerName`: The name of the worker, useful for debugging purposes.


**src/my-app/my-app.tsx:**

```tsx
import { Component } from '@stencil/core';
import { worker } from '../../stuff.worker.ts?worker';

@Component({
  tag: 'my-cmp'
}
export class MyApp {

  componentWillLoad() {
    worker.postMessage(['send data manually']);
  }
}
```


