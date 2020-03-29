---
title: AngularとStencilの連携
description: AngularとStencilの連携
url: /docs/angular
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - peterpeterparker
  - jeanbenitez
  - mburger81
---

# Angular

Stencilで構築されたWebコンポーネントコレクションをAngular CLIのプロジェクトで使用するには、2段階のプロセスが必要です。必要がある：

Using a Stencil built web component collection within an Angular CLI project is a two-step process. We need to:

1. コンポーネントを使用するモジュールに`CUSTOM_ELEMENTS_SCHEMA`を含めます。
2. `main.ts`（または他の適切な場所）から、`defineCustomElements()`を呼び出します。

1. Include the `CUSTOM_ELEMENTS_SCHEMA` in the modules that use the components.
2. Call `defineCustomElements()` from `main.ts` (or some other appropriate place).

## Custom Elementsのスキーマを含める

モジュールに`CUSTOM_ELEMENTS_SCHEMA`を含めると、コンパイラがエラーを出すことなくHTMLマークアップでWebコンポーネントを使用できます。このコードは、`AppModule`とCustom Elementsを使用する他の全てのモジュールに追加する必要があります。  
これは`AppModule`に追加する例です。

Including the `CUSTOM_ELEMENTS_SCHEMA` in the module allows the use of the web components in the HTML markup without the compiler producing errors. This code should be added into the `AppModule` and in every other modules that use your custom elements.  
Here is an example of adding it to `AppModule`:

```tsx
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

`CUSTOM_ELEMENTS_SCHEMA`は、Custom Elementsを使用する全てのモジュールに含める必要があります。

The `CUSTOM_ELEMENTS_SCHEMA` needs to be included in any module that uses custom elements.

## defineCustomElementsを呼び出す

Stencilで作成されたコンポーネントコレクションには、コレクション内のコンポーネントを読み込むためのメイン関数が含まれています。その関数は`defineCustomElements()`と呼ばれ、アプリケーションのブートストラップ中に一度呼び出す必要があります。これを行うのに便利な場所の1つは、`main.ts`です。

A component collection built with Stencil includes a main function that is used to load the components in the collection. That function is called `defineCustomElements()` and it needs to be called once during the bootstrapping of your application. One convenient place to do this is in `main.ts` as such:

```tsx
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Note: 出力ターゲット設定の"esmLoaderPath"で設定されたパスのローダーをインポート
import { defineCustomElements } from 'test-components/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
defineCustomElements();
```

## EdgeとIE11のポリフィル

Custom Elementsを古いブラウザで動作させるには、`defineCustomElements()`を`applyPolyfills()`で囲む必要があります。

If you want your custom elements to be able to work on older browsers, you should add the `applyPolyfills()` that surround the `defineCustomElements()` function.

```tsx
import { applyPolyfills, defineCustomElements } from 'test-components/loader';
...
applyPolyfills().then(() => {
  defineCustomElements()
})

```

## ViewChildやViewChildrenを使用したコンポーネントへのアクセス

次の例のように`ViewChild`や`ViewChildren`を使用してコンポーネントを参照できます。

Once included, components could be referenced in your code using `ViewChild` and `ViewChildren` as in the following example:

```tsx
import {Component, ElementRef, ViewChild} from '@angular/core';

import 'test-components';

@Component({
    selector: 'app-home',
    template: `<test-components #test></test-components>`,
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    @ViewChild('test') myTestComponent: ElementRef<HTMLTestComponentElement>;

    async onAction() {
        await this.myTestComponent.nativeElement.testComponentMethod();
    }
}

```
