/* Use this file to declare any custom file extensions for importing */
/* Use this folder to also add/extend a package d.ts file, if needed. */

/* CSS MODULES */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

/* CSS */
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.styl';

/* IMAGES */
declare module '*.svg' {
  const ref: string;
  export default ref;
}
declare module '*.bmp' {
  const ref: string;
  export default ref;
}
declare module '*.gif' {
  const ref: string;
  export default ref;
}
declare module '*.jpg' {
  const ref: string;
  export default ref;
}
declare module '*.jpeg' {
  const ref: string;
  export default ref;
}
declare module '*.png' {
  const ref: string;
  export default ref;
}

/* CUSTOM: ADD YOUR OWN HERE */
type Domain = string;
type SubRouteHandler = {
  handler: 'subroute';
  routes: Route[];
};

type RewriteHandler = {
  handler: 'rewrite';
  url: string;
  strip_path_prefix: string;
};

type StaticResponseHandler = {
  handler: 'static_response';
  body: string;
};

type ReverseProxyHandler = {
  handler: 'reverse_proxy';
  headers?: {};
  upstreams: { dial: string }[];
};

type FileServerHandler = {
  handler: 'file_server';
  root?: string;
  index?: string;
  browse?: string;
};

type Handler =
  | RewriteHandler
  | SubRouteHandler
  | StaticResponseHandler
  | ReverseProxyHandler
  | FileServerHandler;

type HostMatch = { host: Domain[]; path?: string[] };
type Match = HostMatch | { path: string[] };

type Route = {
  handle: Handler[];
  match?: Match[];
  terminal?: boolean;
};

type Server = {
  listen: string[];
  routes: Route[];
  errors?: { routes: {}[] };
};

type InternalIssuer = {
  module: 'internal';
};

type Issuer = InternalIssuer;

type Policy = {
  issuers: Issuer[];
  subjects: Domain[];
};

type Servers = {
  [key: string]: Server;
};

type TlsMap = { [key: Domain]: Issuer };

type Apps = {
  http: { servers: Servers };
  tls: { automation: { policies: Policy[] } };
};

type Row = {
  name: string;
  // listen: string[];
  source: string[];
  destination: FlatRoute[];
  _handle?: Handler;
  ssl: string;
  access: string;
  status?: string;
};

type FlatRoute = {
  path: string;
  handle?: Handler;
};

type WebRoute = {
  icon: string;
  label: string;
  path: string;
  page: (props: { path: string; default?: boolean }) => JSX.Element;
};

type WebRoutes = { [key: string]: WebRoute };
