/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Icon/Edit';

import styles from './styles.module.css';

export default function IconEdit({
  className,
  ...restProps
}: Props): JSX.Element {
  return (
    <svg className={clsx(styles.iconEdit, className)} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" {...restProps}><path fill="#222D3A" d="M7 0a7.1 7.1 0 0 0-7 7.18c0 3.17 2 5.86 4.79 6.8.04.02.08.02.12.02.26 0 .36-.2.36-.36l-.01-1.22c-.27.06-.5.09-.71.09-1.35 0-1.65-1.05-1.65-1.05-.32-.83-.78-1.05-.78-1.05-.61-.43 0-.44.04-.44.7.06 1.08.74 1.08.74.35.61.82.79 1.23.79.33 0 .63-.1.8-.2.07-.45.25-.77.45-.95-1.55-.18-3.19-.8-3.19-3.55 0-.78.27-1.42.72-1.92-.07-.18-.31-.91.07-1.9 0 0 .05-.02.16-.02.25 0 .82.1 1.76.76a6.56 6.56 0 0 1 3.51 0c.94-.66 1.52-.76 1.77-.76.1 0 .16.02.16.02.38.99.14 1.72.06 1.9.45.5.72 1.14.72 1.92 0 2.76-1.64 3.37-3.2 3.54.26.23.48.66.48 1.33v1.97c0 .17.09.36.35.36a.6.6 0 0 0 .12-.01A7.16 7.16 0 0 0 14 7.18 7.1 7.1 0 0 0 7 0Z"/></svg>
  );
}
