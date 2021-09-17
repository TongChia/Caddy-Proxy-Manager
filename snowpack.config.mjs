/** @type {import("snowpack").SnowpackUserConfig } */
// import proxy from 'http2-proxy';

export default {
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@prefresh/snowpack',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
  ],
  routes: [
    // {
    //   match: 'routes',
    //   src: '/api/.*',
    //   dest: (req, res) => proxy.web(req, res, {
    //     hostname: 'localhost',
    //     port: 8443,
    //   }),
    // },
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
