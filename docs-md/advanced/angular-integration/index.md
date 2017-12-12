# Angular + Stencil 构建 Web 组件

使用 Stencil 构建含有 Angular CLI 项目的 web 组件集合需要3个步骤。我们需要:

1. 在使用组件的 modules 中包含 CUSTOM_ELEMENTS_SCHEMA
1. 在 `index.html` 中包含载入脚本
1. 构建过程中复制组件集合

## 包含 Custom Elements Schema

在 modules 中包含 CUSTOM_ELEMENTS_SCHEMA 允许你使用 web 组件中而不会让编译器产生错误。这是一个将其添加到 `AppModule` 的例子：

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 
import { AppComponent } from './app.component';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
```

## 包含载入脚本

一个由 Stencil 构建的组件集合，包含了一个主脚本用于载入这些组件集合。该脚本需要像这样在你的应用中载入：

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Test Component Usage</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src='test-components/testcomponents.js'></script>
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

## 复制组件

在构建过程中，组件需要被复制到输出文件夹。最简单的方法是修改 `.angular-cli.json` 文件里的 `assets` 数组，将组件集合添加到其中。

```
      "assets": [
        "assets",
        "favicon.ico",
        { "glob": "**/*", "input": "../web-components/test-components", "output": "./test-components" }
      ],
```

<stencil-route-link url="/docs/distribution" router="#router" custom="true">
  <button class='backButton'>
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/routing" custom="true">
  <button class='nextButton'>
    继续
  </button>
</stencil-route-link>
