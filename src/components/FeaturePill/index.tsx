import React from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export default function FeaturePill({ children, link }) {
  return (
    <span className={styles.featurePill}>
      <Link to={link}>
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
          <title>Arrow Forward</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M268 112l144 144-144 144M392 256H100"
          />
        </svg>
      </Link>
    </span>
  );
}
