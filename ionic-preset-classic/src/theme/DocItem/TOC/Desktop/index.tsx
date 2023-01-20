import React from 'react';
import Desktop from '@theme-init/DocItem/TOC/Desktop';
import EditThisPage from '@theme/EditThisPage';
import type DesktopType from '@theme/DocItem/TOC/Desktop';
import type {WrapperProps} from '@docusaurus/types';
import { useDoc } from '@docusaurus/theme-common/internal';

type Props = WrapperProps<typeof DesktopType>;

import styles from './index.module.scss';

export default function DesktopWrapper(props: Props): JSX.Element {
  const { metadata: { editUrl } } = useDoc();

  return (
    <div className={styles.tocWrapper}>
      <Desktop {...props} />
      <div className={styles.tocSeparator} />
      <div className={styles.tocBottom}>
        <EditThisPage editUrl={editUrl || ''} />
      </div>
    </div>
  );
}
