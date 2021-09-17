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

type Match = { host: string[]; path: string[] };

type Route = {
  handle: Handler[];
  match?: Match[];
  terminal: boolean;
};

type Service = {
  listen: string[];
  routes: Route[];
  errors?: { routes: {}[] };
};

type Row = {
  name: string;
  // listen: string[];
  source: string[];
  destination: FlatRoute[];
  _handle?: SubRouteHandler;
  ssl: string;
  access: string;
  status: string;
};

type FlatRoute = {
  path: string;
  handle?: Handler;
};
