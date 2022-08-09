import clsx from 'clsx';
import React from 'react';

import styles from "./styles.module.css"

interface Props {
  className?: string
  children: any
}

export default function UiContainer (props: Props) {
  const { className, children } = props

  return <div className={clsx(styles.uiContainer, className)}>
    { children }
  </div>
}
