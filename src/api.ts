// import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import axios from 'axios';
// import bcrypt from 'bcryptjs';

type NewHost = {
  host: Domain[];
  port: string[];
  handle: Handler;
  subRoutes?: { path: string; handle: Handler }[];
  tls?: any[];
};

export const createHost = ({ host, port, handle, subRoutes }: NewHost) => {
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
  return axios
    .get<Servers>('/api/config/apps/http/servers')
    .then(({ data: conf }) => {
      const rest = Object.entries(conf)
        .filter(([, { listen }]) => port.includes(listen[0]))
        .reduce((ports, [, { listen, routes }]) => {
          routes.push(route);
          return ports.filter((p) => listen[0] != p);
        }, port);
      if (rest.length) {
        rest.forEach((p) => {
          conf['listen' + p] = { listen: [p], routes: [route] };
        });
      }

      return axios.post<Server>('/api/config/apps/http/servers', conf, {
        timeout: 2000,
      });
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
        r.routes.reduce(routeReducer, assign(results, { parent: route.path }));
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

const isStaticHandler = (handle?: Handler): handle is StaticResponseHandler =>
  handle?.handler == 'static_response';

const isAbortHandler = (handle?: Handler) =>
  isStaticHandler(handle) && handle.abort == true;

const hostReducer = (
  results: HostRows & {
    listen?: string[];
    parent?: string;
  },
  { match, handle, '@id': id }: Route,
  i: number,
) => {
  const { listen = [':80'], parent = '' } = results;
  const isCPMid = id && id.startsWith('CPM:');
  const hostMatch = match?.find(isHostMatch);

  if (isCPMid) {
    // TODO:
  } else if (hostMatch) {
    const { host } = hostMatch;
    const subHandler = handle.find(isSubRouteHandler);
    const main = subHandler || handle[0];
    const index = handle.indexOf(main);
    // const same = results.find(({ _handle }) => isEqual(_handle, main));

    // if (same) {
    //   host.forEach((s) => same.source.push(s + listen));
    //   same._paths?.push([parent, i, 'handle', index].join('/'));
    // } else
    if (host[0].includes('*')) {
      subHandler?.routes.reduce(
        hostReducer,
        assign(results, {
          parent: [parent, i, 'handle', index, 'routes'].join('/'),
        }),
      );
      results.parent = parent;
    } else {
      results.push({
        source: host.map((s) => s + listen),
        _handle: main,
        _paths: [[parent, i, 'handle', index].join('/')],
        destination: subHandler
          ? subHandler.routes.reduce(routeReducer, []) // .sort((a, b) => a.path.length - b.path.length)
          : [{ path: '', handle: main }],
        // ssl: results.policies.filter((p) =>
        //   p.subjects?.some((s) => host.includes(s)),
        // ),
        ssl: [],
        access: 'Public', // TODO: basic auth
      });
    }
    // } else {
    //   const same = results.find(({ source }) => isEqual(source, listen));
    //   if (same) {
    //     same.destination = routeReducer(same.destination, {
    //       match,
    //       handle,
    //     }); //.sort((a, b) => a.path.length - b.path.length);
    //   } else {
    //     results.push({
    //       // name,
    //       source: listen,
    //       _handle: handle[0],
    //       destination: routeReducer([], { match, handle }),
    //       ssl: [],
    //       access: 'Public',
    //     });
    //   }
  }
  return results;
};

export const getHosts = (): Promise<HostRows> =>
  axios.get<{ apps: Apps }>('/api/config/').then(
    ({
      data: {
        apps: {
          http: { http_port = 80, https_port = 443, servers },
          tls,
        },
      },
    }) => {
      const policies =
        tls?.automation?.policies?.filter(({ subjects }) => subjects?.length) ||
        [];
      const listens = [http_port, https_port] as [number, number];
      const hosts = Object.entries(servers).reduce<HostRows>(
        (results, [srv, { routes, listen }]) =>
          routes.reduce(
            hostReducer,
            assign(results, { listen, parent: srv + '/routes' }),
          ),
        assign([], { policies, listens }),
      );
      return hosts;
    },
  );

export const getCerts = (): Promise<Policy[]> =>
  axios
    .get<{ automation?: { policies: Policy[] } }>('/api/config/apps/tls')
    .then(
      ({ data }) =>
        data?.automation?.policies?.filter(({ issuers }) => issuers?.length) ||
        [],
    );

export const getAccessLists = (): Promise<AccessList[]> =>
  axios
    .get<AccessList[]>('/local_backend/access-lists.json')
    .then(({ data, status }) => data);

export const getUsers = (): Promise<User[]> =>
  axios
    .get<{ users: User[] }>('/local_backend/users.json')
    .then(({ data: { users } }) => users);

type ChangePasswdParams = {
  id: string;
  current: string;
  password: string;
};
// export const setPasswd = async ({
//   id,
//   current,
//   password,
// }: ChangePasswdParams) => {
//   const { data } = await axios.get<{ users: User[] }>(
//     '/local_backend/users.json',
//   );
//
//   for (let {
//     id: _id,
//     passwords: [_current],
//   } of data.users) {
//     if (_id == id) {
//       if (await bcrypt.compare(current, _current.hash)) {
//         const salt = await bcrypt.genSalt(_current.cost);
//         _current.hash = await bcrypt.hash(password, salt);
//       } else {
//         throw Error('Password not ok');
//       }
//       break;
//     }
//   }
//
//   const { data: text } = await axios.put(
//     '/local_backend/users.json',
//     JSON.stringify(data),
//   );
//
//   if (text != 'Created') throw Error('Update filed');
//
//   await axios.post('/api/stop', null, { timeout: 10 });
// };

export const changePassword = ({ id, current, password }: ChangePasswdParams) =>
  axios
    .post(
      '/authp/settings/password/edit',
      new URLSearchParams({
        secret1: current,
        secret2: password,
        secret3: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(({ status, data: html }) => {
      if (status != 200) console.error(status);
      else {
        const matched = html.match(/\<h1\>(.*)\<\/h1\>/);
        if (matched[1] != 'Password Has Been Changed') {
          throw Error(matched[1]);
        }
      }
    });

export const loginApi = (data: { username: string; password: string }) =>
  axios.post<{ token: string }>(
    '/auth/login',
    { ...data, realm: 'local' },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
