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

上記の手順に従うと、ReactでWebコンポーネントを使用できるようになりますが、いくつか考慮が必要な問題があります。https://custom-elements-everywhere.com/ には、現在確認されている問題の概要が記載されています。

## プロパティとイベント

標準のHTML Custom Elementの操作に関してReactが現在抱えている最大の欠点は、非スカラーデータ（文字列や数値ではないデータ）を含むプロパティが適切に渡されず、カスタムイベントが適切に処理されないことです。これらの問題を解決するためには、Custom ElementをReactコンポーネントでラップし、Custom Elementへの`ref`を取得します。そして、`ref`を使用して非スカラープロパティを設定し、`addEventListener`を介してイベントリスナーを追加することです。次は、プロパティの受け渡しでどのように機能するかを示す例です。

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

この例では、3つのプロパティがあります。`forecast`はオブジェクトの配列、`iconPaths`はオブジェクト、`scale`は文字列です。`scale`は文字列なので通常通り扱えます。ただし、他の2つのプロパティは非スカラーなので`ref`を介してCustom Elementに設定する必要があります。このようにCustom Elementをラップすると、次のように`DailyForecast`Reactコンポーネントを使用できるため、`kws-daily-forecast`のすべてのインスタンスで`ref`を取得する必要がなくなります。

```tsx
<DailyForecast scale={scale} forecast={f}></DailyForecast>
```

## Stencil DS プロキシプラグイン

手動で全てのCustom ElementをReactコンポーネントでラップすることは良い方法ですが、手間がかかります。そのため、<a href="https://github.com/ionic-team/stencil-ds-plugins" target="_blank">Stencil DS Plugins</a>を使用することをお勧めします。これらは、Custom Elementプロキシを作成するStencilの出力ターゲットプラグインのセットです。詳細については、<a href="https://github.com/ionic-team/stencil-ds-plugins/blob/master/README.md" target="_blank">Stencil DS Plugin documentation</a>を参照してください。
