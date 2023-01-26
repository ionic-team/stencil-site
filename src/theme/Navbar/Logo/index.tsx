import React from 'react';
import Logo from '@theme/Logo';
import Link from '@docusaurus/Link';

import styles from './index.module.scss';

export default function NavbarLogo(): JSX.Element {
  return (
    <div className={styles.navbar}>
      <Logo
        className="navbar__brand"
        imageClassName="navbar__logo"
        titleClassName="navbar__title text--truncate"
      />
      <Link href="/introduction">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="14" fill="none"><path fill="#92A0B3" d="M4.53 13C8.69 13 11 10.52 11 6.96 11 3.42 8.7.93 4.53.93H.43V13h4.1Zm4.3-6.04c0 2.5-1.4 4.14-4.37 4.14H2.48V2.83h1.98c2.97 0 4.37 1.64 4.37 4.13Zm5.9 0c0-2.6 1.7-4.31 4.06-4.31 2.36 0 4.06 1.71 4.06 4.31 0 2.6-1.7 4.32-4.06 4.32-2.37 0-4.07-1.71-4.07-4.31Zm-2.18 0a6.06 6.06 0 0 0 6.24 6.3c3.67 0 6.24-2.7 6.24-6.3A6.06 6.06 0 0 0 18.79.67a6.06 6.06 0 0 0-6.24 6.3Zm14.01-.01c0 3.72 2.52 6.29 6.03 6.29 3 0 5.3-1.79 5.8-4.66h-2.2c-.4 1.7-1.78 2.69-3.6 2.69-2.4 0-3.85-1.72-3.85-4.32 0-2.6 1.44-4.3 3.85-4.3 1.82 0 3.2.98 3.6 2.68h2.2C37.9 2.46 35.6.67 32.6.67c-3.51 0-6.03 2.57-6.03 6.28Zm17.79 4.43c-1.63 0-2.5-.86-2.59-2.15h-2.04c.07 1.97 1.31 4 4.52 4 2.9 0 4.8-1.42 4.8-3.61 0-4.83-6.8-2.77-6.8-5.43 0-1.07.87-1.66 2.28-1.66 1.54 0 2.34.95 2.36 2.14h2.02c-.05-2.26-1.54-4-4.38-4-2.69 0-4.32 1.65-4.32 3.58 0 4.82 6.75 2.51 6.75 5.45 0 1.09-.95 1.69-2.6 1.69Z"/></svg>
      </Link>
    </div>
  );
}
