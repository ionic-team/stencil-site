import React, { useEffect } from 'react';

import styles from './index.module.scss'

type DocSearchProps = {
  apiKey: string;
  indexName: string;
  inputSelector: string;
  debug: boolean;
}

interface CustomWindow extends Window {
  docsearch: (props: DocSearchProps) => void;
}

declare const window: CustomWindow;

export default function SearchBar() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js';
    script.async = true;
    script.onload = () => {
      window.docsearch({
        apiKey: '6399791d239c7e56a6b47685a64f8873',
        indexName: 'stenciljs',
        inputSelector: '#algolia-search',
        debug: false // Set debug to true if you want to inspect the dropdown
      });
    };

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css';

    document.body.appendChild(script);
    document.head.appendChild(link);
  }, []);

  return (
    <div className={styles.search}>
      <input className={styles.searchInput} placeholder="Search docs..." id="algolia-search" />
    </div>
  );
}