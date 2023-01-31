/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Translate from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import IconEdit from '@theme/Icon/Edit';
export default function EditThisPage({ editUrl }) {
    return (React.createElement(Link, { to: editUrl, className: ThemeClassNames.common.editThisPage },
        React.createElement(IconEdit, null),
        React.createElement(Translate, { id: "theme.common.editThisPage", description: "The link label to edit the current page" }, "Submit an edit")));
}
