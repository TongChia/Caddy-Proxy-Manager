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
  url?: string;
  strip_path_prefix?: string;
};

type StaticResponseHandler = {
  handler: 'static_response';
  abort?: boolean;
  body?: string;
  headers?: { [key: string]: string | string[] };
  status_code?: number;
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

type Account = { username: string; password: string };
type BasicAuthProvider = {
  accounts: Account[];
  hash: { algorithm: string };
  hash_cache?: {};
};

type AuthenticationHandler = {
  handler: 'authentication';
  providers: {
    http_basic?: BasicAuthProvider;
  };
};

type Handler =
  | RewriteHandler
  | SubRouteHandler
  | StaticResponseHandler
  | ReverseProxyHandler
  | FileServerHandler
  | AuthenticationHandler;

type HostMatch = { host: Domain[]; path?: string[] };
type Match = HostMatch | { path: string[] };

type Route = {
  '@id'?: string;
  handle: Handler[];
  match?: Match[];
  terminal?: boolean;
};

type Server = {
  listen: string[];
  routes: Route[];
  errors?: { routes: {}[] };
  automatic_https?: { disable?: boolean; skip?: Domain[] };
};

type Issuer = {
  module: 'internal' | 'zerossl' | 'acme';
  email?: string;
  challenges?: {
    dns: {
      provider: {
        api_token: string;
        name: string;
      };
      resolvers: string[];
    };
  };
};

type Policy = {
  issuers?: Issuer[];
  subjects?: Domain[];
};

type BcryptPassword = {
  algorithm: 'bcrypt';
  cost: number;
  hash: string;
  expired_at: string;
};

type EmailAddress = {
  address: string;
  domain: string;
};

type Role = {
  name: string;
  organization: string;
};

type User = {
  id: string;
  username: string;
  fullname?: string;
  passwords: BcryptPassword[];
  created: string;
  last_modified: string;
  email_address: EmailAddress;
  email_addresses: EmailAddress[];
  roles: Role[];
};

type Servers = {
  [key: string]: Server;
};

type Apps = {
  http: {
    servers: Servers;
    http_port?: number;
    https_port?: number;
  };
  tls?: { automation?: { policies: Policy[] } };
};

type HostRows = HostRow[] & {
  listens: [number, number];
  policies: Policy[];
};

type HostRow = {
  // name: string;
  // listen: string[];
  source: string[];
  destination: FlatRoute[];
  ssl: Policy[];
  access: string;
  // status?: string;
  _handle?: Handler;
  _paths?: string[];
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
