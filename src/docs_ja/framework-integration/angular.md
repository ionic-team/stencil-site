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

Stencilで構築されたWebコンポーネントコレクションをAngular CLIのプロジェクトで使用するには、次の2段階のプロセスが必要です。

1. コンポーネントを使用するモジュールに`CUSTOM_ELEMENTS_SCHEMA`を含める。
2. `main.ts`（または他の適切な場所）から、`defineCustomElements()`を呼び出す。

## Custom Elementsのスキーマを含める

モジュールに`CUSTOM_ELEMENTS_SCHEMA`を含めると、コンパイラがエラーを出すことなくHTMLのマークアップでWebコンポーネントを使用できます。このコードは、`AppModule`とCustom Elementsを使用する他の全てのモジュールに追加する必要があります。
次は`AppModule`に追加する例です。

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

## defineCustomElementsを呼び出す

Stencilで作成されたコンポーネントコレクションには、コレクション内のコンポーネントを読み込むためのメイン関数が含まれています。その関数は`defineCustomElements()`と呼ばれ、アプリケーションの起動中に一度呼び出す必要があります。これを行うのに便利な場所の1つとして`main.ts`があります。

```tsx
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Note: 出力ターゲット設定の"esmLoaderPath"で設定されたローダーをインポート
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

```tsx
import { applyPolyfills, defineCustomElements } from 'test-components/loader';
...
applyPolyfills().then(() => {
  defineCustomElements()
})

```

## ViewChildやViewChildrenを使用したコンポーネントへのアクセス

次の例のように`ViewChild`や`ViewChildren`を使用してコンポーネントを参照できます。

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
