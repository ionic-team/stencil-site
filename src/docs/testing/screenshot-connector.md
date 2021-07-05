---
title: Screenshot Connector
description: Screenshot Connector
url: /docs/screenshot-connector
contributors:
  - SheepFromHeaven
---

# Screenshot connector
You can configure a screenshot connector module to be used by the screenshot testing process, to modify the default behaviour of the caching, comparing and publishing of your tests.
Just create a file which defines a connector class and point to it in your stencil testing config:

```tsx
export const config: Config = {
  ...
  testing: {
    screenshotConnector: './connector.js'
  }
};
```

## Writing a connector
To write a connector, import the base `ScreenshotConnector` class from stencil and extend it:
```javascript
const { ScreenshotConnector } = require('@stencil/core/screenshot');

module.exports = class ScreenshotCustomConnector extends ScreenshotConnector {
  ...
};
```

> For a good reference on how this can be done, have a look at the default `StencilLocalConnector` [here](https://github.com/ionic-team/stencil/blob/master/src/screenshot/connector-local.ts)

## Methods
The base connector which can be imported and extended from stencil has the following methods which can be overwritten:

```tsx
export interface ScreenshotConnector {
  initBuild(opts: ScreenshotConnectorOptions): Promise<void>;

  pullMasterBuild(): Promise<void>;

  getMasterBuild(): Promise<ScreenshotBuild>;

  getScreenshotCache(): Promise<ScreenshotCache>;

  completeBuild(masterBuild: ScreenshotBuild): Promise<ScreenshotBuildResults>;
  
  publishBuild(buildResults: ScreenshotBuildResults): Promise<ScreenshotBuildResults>;

  updateScreenshotCache(screenshotCache: ScreenshotCache, buildResults: ScreenshotBuildResults): Promise<ScreenshotCache>;

  generateJsonpDataUris(build: ScreenshotBuild): Promise<void>;
}
```
For references to the interfaces, [see here](#interfaces)

### initBuild(options)
This method is being called to setup the connector and ready everything for running the tests. It is responsible for setting up the variables, filepaths and folder structures needed for running the screenshot tests.

> Only overwrite this method if you know what you do! For easy extension, make sure to call `super.initBuild`

### pullMasterBuild()
After initializing the connector, and setting up the build, this method is being run to give the possibility to pull the master build. This can be very useful in case the screenshots are stored somewhere else then on the machine on which the tests are running.

### getMasterBuild()
Now that the tests are setup an ready to run this method is being called to return the master build. So instead of loading the master build from a file it could be fetched from an api and returned in this method.

### getScreenshotCache()
This method is being called to return the screenshot cache which will then be extended with the current build results.

### completeBuild(masterBuild)
After running the tests and generating the screenshots into the configured folder, this method is being called to create the result json data. At this time the images are there and the master build is being passed in as an option.

> Only overwrite this method if you know what you do! For easy extension, make sure to call `super.completeBuild`

### publishBuild(buildResults)
Now that the build has been completed and the results were generated, this method will be called with the result data. In here the results can be written to a json file, or sent to a remote location. In the default `StencilLocalConnector` this method will create the compare app html.

### updateScreenshotCache(screenshotCache, buildResults)
At the end of the whole run, the screenshot cache should be updated with this method. So it can be written to a file or be sent to an api from here.


## Interfaces
```tsx
export interface ScreenshotConnectorOptions {
  buildId: string;

  buildMessage: string;

  buildAuthor?: string;

  buildUrl?: string;

  previewUrl?: string;

  appNamespace: string;

  buildTimestamp: number;

  logger: Logger;

  rootDir: string;

  cacheDir: string;

  packageDir: string;

  screenshotDirName?: string;

  imagesDirName?: string;

  buildsDirName?: string;

  currentBuildDir?: string;

  updateMaster?: boolean;

  allowableMismatchedPixels?: number;

  allowableMismatchedRatio?: number;

  pixelmatchThreshold?: number;

  waitBeforeScreenshot?: number;

  pixelmatchModulePath?: string;
}

export interface ScreenshotBuild {
  id: string;

  message: string;

  author?: string;

  url?: string;

  previewUrl?: string;

  appNamespace: string;

  timestamp: number;

  screenshots: Screenshot[];
}

export interface ScreenshotBuildResults {
  appNamespace: string;

  masterBuild: ScreenshotBuild;

  currentBuild: ScreenshotBuild;

  compare: ScreenshotCompareResults;
}

export interface ScreenshotCompareResults {
  id: string;

  a: {
    id: string;
    message: string;
    author: string;
    url: string;
    previewUrl: string;
  };

  b: {
    id: string;
    message: string;
    author: string;
    url: string;
    previewUrl: string;
  };

  timestamp: number;

  url: string;

  appNamespace: string;

  diffs: ScreenshotDiff[];
}

export interface ScreenshotCache {
  timestamp?: number;

  lastBuildId?: string;

  size?: number;

  items?: {
    /**
     * Cache key
     */
    key: string;

    /**
     * Timestamp used to remove the oldest data
     */
    ts: number;

    /**
     * Mismatched pixels
     */
    mp: number;
  }[];
}

export interface Screenshot {
  id: string;

  desc?: string;

  image: string;

  device?: string;

  userAgent?: string;

  width?: number;

  height?: number;

  deviceScaleFactor?: number;

  hasTouch?: boolean;

  isLandscape?: boolean;

  isMobile?: boolean;

  testPath?: string;

  diff?: ScreenshotDiff;
}

export interface ScreenshotDiff {
  mismatchedPixels: number;

  id?: string;

  desc?: string;

  imageA?: string;

  imageB?: string;

  device?: string;

  userAgent?: string;

  width?: number;

  height?: number;

  deviceScaleFactor?: number;

  hasTouch?: boolean;

  isLandscape?: boolean;

  isMobile?: boolean;

  allowableMismatchedPixels: number;

  allowableMismatchedRatio: number;

  testPath?: string;

  cacheKey?: string;
}
```
