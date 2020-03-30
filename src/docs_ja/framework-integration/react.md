---
title: ReactとStencilの連携
description: ReactとStencilの連携
url: /docs/react
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - ErikSchierboom
  - brentertz
  - danawoodman
---
# React

`create-react-app`で構築されたアプリケーションにコンポーネントライブラリを含める最も簡単な方法は、`index.js`ファイルから `defineCustomElements()`を呼び出すことです。
EdgeまたはIE11を対象とする場合は、`applyPolyfills`が必要であることに注意してください。

With an application built using the `create-react-app` script the easiest way to include the component library is to call `defineCustomElements()` from the `index.js` file.
Note that in this scenario `applyPolyfills` is needed if you are targeting Edge or IE11.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// test-componentはnpmに公開されたWebコンポーネントの名前です。
import { applyPolyfills, defineCustomElements } from 'test-components/loader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

applyPolyfills().then(() => {
  defineCustomElements();
});
```

上記の手順に従うと、ReactでWebコンポーネントを使用できるようになりますが、いくつか考慮が必要な問題があります。現在確認されている問題の概要は https://custom-elements-everywhere.com/ に記載されています。

Following the steps above will enable your web components to be used in React, however there are some additional complexities that must also be considered.  https://custom-elements-everywhere.com/ contains a synopsis of the current issues.

## プロパティとイベント

標準のHTML Custom Elementsの操作に関してReactが現在抱えている最大の欠点は、非スカラーデータ（文字列や数値ではないデータ）を含むプロパティが適切に渡されず、カスタムイベントが適切に処理されないことです。これらの問題を解決するためには、Custom ElementsをReactコンポーネントでラップし、Custom Elementsへの`ref`を取得して非スカラープロパティを設定し、`addEventListener`を介してイベントリスナーを追加することです。次は、プロパティの受け渡しでどのように機能するかを示す例です。

The largest deficiencies that React currently has when it comes to working with standard HTML Custom Elements is that properties that contain non-scalar data (that is, data that is not a string or number) are not passed properly and custom events are not handled properly. The solution to both of these problems is to wrap the Custom Element in a React component, obtain a `ref` to the Custom Element, and use the `ref` in order to set the non-scalar properties and add event listeners via `addEventListener`. Here is an example showing how this works for the property passing:

```tsx
import React, { useRef, useEffect } from 'react';
import { Forecast } from '../models';
import { iconPaths } from '../util';

const DailyForecast: React.FC<{ forecast: Forecast; scale: string }> = ({ forecast, scale }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    (elementRef.current as any)!.iconPaths = iconPaths;
    (elementRef.current as any)!.forecasts = forecast;
  }, [forecast]);

  return <kws-daily-forecast scale={scale} ref={elementRef}></kws-daily-forecast>;
};

export default DailyForecast;
```

この例では、3つのプロパティがあります。`forecast`はオブジェクトの配列、`iconPaths`はオブジェクト、`scale`は文字列です。`scale`は文字列なので通常通り扱えます。ただし、他の2つのプロパティは非スカラーなので`ref`を介してCustom Elementに設定する必要があります。このようにCustom Elementをラップすると、次のように`DailyForecast`Reactコンポーネントを使用するため、`kws-daily-forecast`のすべてのインスタンスで`ref`を取得する必要がなくなります。

In this example, there are three properties: `forecast` is an array of objects, `iconPaths` is an object, and `scale` is a string. Since `scale` is a string it can be handled normally. However, the other two properties are non-scalar and must be set via the `ref` to the Custom Element. Wrapping the Custom Element as such prevents you from having to obtain a `ref` with every instance of `kws-daily-forecast` that you may need since you will instead be using the `DailyForecast` React component as such:

```tsx
<DailyForecast scale={scale} forecast={f}></DailyForecast>
```

## Stencil DS プロキシプラグイン

手動で全てのCustom ElementをReactコンポーネントでラップすることは良い方法ですが、手間がかかります。そのため、<a href="https://github.com/ionic-team/stencil-ds-plugins" target="_blank">Stencil DS Plugins</a>を使用することをお勧めします。これらは、Custom Elementプロキシを作成するStencilの出力ターゲットプラグインのセットです。詳細については、<a href="https://github.com/ionic-team/stencil-ds-plugins/blob/master/README.md" target="_blank">Stencil DS Plugin documentation</a>を参照してください。

Manually wrapping all Custom Elements in a React Component is a good practice, but it gets tedious quickly. For that reason, we suggest using the <a href="https://github.com/ionic-team/stencil-ds-plugins" target="_blank">Stencil DS Plugins</a> to do the work for you. These are a set of Stencil output target plugins that create the Custom Element proxies for you. Please refer to the <a href="https://github.com/ionic-team/stencil-ds-plugins/blob/master/README.md" target="_blank">Stencil DS Plugin documentation</a> for details.
