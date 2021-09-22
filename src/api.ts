import { curl } from './utils';
import isEqual from 'lodash/isEqual';

type NewHost = {
  host: Domain[];
  port: string[];
  handle: Handler;
  subRoutes?: { path: string; handle: Handler }[];
  tls?: any[];
};

const createHost = ({ host, port, handle, subRoutes }: NewHost) => {
  const route: Route = {
    match: [{ host }],
    handle: !subRoutes?.length
      ? [handle]
      : [
          {
            handler: 'subroute',
            routes: subRoutes
              .map<Route>(({ path, handle }) => ({
                match: [{ path: [path] }],
                handle: [handle],
              }))
              .concat([{ handle: [handle] }]),
          },
        ],
  };

  return curl<Servers>('/api/config/apps/http/servers').then((conf) => {
    console.debug('before: ', conf);
    const rest = Object.entries(conf)
      .filter(([, { listen }]) => port.includes(listen[0]))
      .reduce((ports, [, { listen, routes }]) => {
        routes.push(route);
        return ports.filter((p) => listen[0] == p);
      }, port);
    if (rest.length) {
      rest.forEach((p) => {
        conf['listen' + p] = { listen: [p], routes: [route] };
      });
    }
    console.debug('after: ', conf);
    return curl('api/load', 'POST', conf);
  });
};

const routeReducer = (
  results: FlatRoute[] & { parent?: string },
  { match, handle }: Route,
): FlatRoute[] => {
  const { parent } = results;
  const route: FlatRoute = { path: parent || '' };

  if (match) {
    match.forEach(({ path }) => {
      if (path?.length) {
        route.path += path[0];
      }
    });
  }
  if (handle) {
    handle.forEach((r) => {
      if (r.handler == 'subroute') {
        r.routes.reduce(
          routeReducer,
          Object.assign(results, { parent: route.path }),
        );
        results.parent = parent;
      } else if (
        ['reverse_proxy', 'static_response', 'redir'].includes(r.handler)
      ) {
        route.handle = r;
        results.unshift(route);
      }
    });
  }

  return results;
};

const isHostMatch = (match?: Match): match is HostMatch =>
  // @ts-ignore
  match?.host?.length > 0;

const isSubRouteHandler = (handle?: Handler): handle is SubRouteHandler =>
  handle?.handler == 'subroute';

const serveReducer = (
  results: Row[],
  [name, { routes, listen }]: [string, Server],
): Row[] => {
  routes.forEach(({ match, handle }) => {
    if (match?.some(isHostMatch)) {
      match?.forEach((m) => {
        if (isHostMatch(m)) {
          const { host } = m;
          const subRouteHandle = handle.find(isSubRouteHandler);
          const main = subRouteHandle || handle[0];
          const same = results.find(({ _handle }) => isEqual(_handle, main));

          if (same) {
            host.forEach((s) => same.source.push(s + listen));
          } else {
            results.push({
              name,
              source: host.map((s) => s + listen),
              _handle: main,
              destination: subRouteHandle
                ? subRouteHandle.routes.reduce(routeReducer, []) // .sort((a, b) => a.path.length - b.path.length)
                : [{ path: '', handle: main }],
              ssl: 'Zero SSL',
              access: 'Public', // TODO: basic auth | jwt
            });
          }
        }
      });
    } else {
      const same = results.find(({ source }) => isEqual(source, listen));
      if (same) {
        same.destination = routeReducer(same.destination, {
          match,
          handle,
        }); //.sort((a, b) => a.path.length - b.path.length);
      } else {
        results.push({
          name,
          source: listen,
          destination: routeReducer([], { match, handle }),
          ssl: 'None',
          access: 'Public',
        });
      }
    }
  });
  return results;
};

export const getHosts = (): Promise<Row[]> =>
  curl<{ apps: Apps }>('/api/config/').then(
    ({
      apps: {
        http: { servers },
        tls,
      },
    }) => {
      console.log(tls);
      const hosts = Object.entries(servers).reduce<Row[]>(serveReducer, []);
      console.log(hosts);
      return hosts;
    },
  );
