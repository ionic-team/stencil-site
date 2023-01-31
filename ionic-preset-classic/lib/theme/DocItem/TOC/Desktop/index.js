import React from 'react';
import Desktop from '@theme-init/DocItem/TOC/Desktop';
import EditThisPage from '@theme/EditThisPage';
import { useDoc } from '@docusaurus/theme-common/internal';
import styles from './index.module.scss';
export default function DesktopWrapper(props) {
    const { metadata: { editUrl } } = useDoc();
    return (React.createElement("div", { className: styles.tocWrapper },
        React.createElement(Desktop, { ...props }),
        React.createElement("div", { className: styles.tocSeparator }),
        React.createElement("div", { className: styles.tocBottom },
            React.createElement(EditThisPage, { editUrl: editUrl || '' }))));
}
