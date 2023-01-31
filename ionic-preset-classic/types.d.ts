// necessary until docusaurus exposes internal types
declare module '@docusaurus/theme-common/internal' {
  const useDoc: any;
}

// declaration.d.ts
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}