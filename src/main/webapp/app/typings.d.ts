declare const VERSION: string;
declare const SERVER_API_URL: string;
declare const DEVELOPMENT: string;
declare const I18N_HASH: string;

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@wowpassport/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowpassport/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowmigas/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowmigas/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowshiplogistic/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowshiplogistic/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowcasemgmt/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowcasemgmt/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowosint/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@wowosint/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}
