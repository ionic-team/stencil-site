/// <reference types="react" />
/// <reference types="@docusaurus/theme-classic" />
import type DesktopType from '@theme/DocItem/TOC/Desktop';
import type { WrapperProps } from '@docusaurus/types';
type Props = WrapperProps<typeof DesktopType>;
export default function DesktopWrapper(props: Props): JSX.Element;
export {};
