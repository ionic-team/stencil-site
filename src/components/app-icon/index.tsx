import React from 'react';

import styles from './styles.module.css'


interface Props {
  name: string
}

export default function AppIcon ({ name }: Props) {

  const className = styles[`icon-${name}`]

  console.log(className);
    return (
      <ion-icon class={className} width="96" height="23" name={name} />
  )
}
