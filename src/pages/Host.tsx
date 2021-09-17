import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import { HostTableRow } from '../components/HostTable';
import isEqual from 'lodash/isEqual';
import { HostDialog } from '../components/HostDialog';

const useStyles = makeStyles({
  table: {
    minWidth: 640,
  },
});

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
        results.push(route);
      }
    });
  }

  return results;
};

function serveReducer(results: Row[], [name, srv]: [string, Service]): Row[] {
  const { routes, listen } = srv;

  if (routes.some(({ match }) => match?.some((m) => m.host?.length))) {
    routes.forEach(({ match, handle }) => {
      if (match?.some((m) => m.host)) {
        match.forEach(({ host }) => {
          if (host) {
            const sources = results.reduce<string[]>(
              (ss, row) => ss.concat(row.source),
              [],
            );
            const subRouteHandle = handle.find(
              ({ handler }) => handler == 'subroute',
            ) as SubRouteHandler | undefined;

            if (subRouteHandle) {
              const sameRow = results.find((_r) =>
                isEqual(_r._handle, subRouteHandle),
              );
              if (sameRow) {
                host.forEach((s) => sameRow.source.push(s + listen));
              } else {
                results.push({
                  name,
                  source: host.map((s) => s + listen),
                  _handle: subRouteHandle,
                  destination: subRouteHandle.routes
                    .reduce(routeReducer, Object.assign([], { parent: '' }))
                    .sort((a, b) => a.path.length - b.path.length),
                  ssl: "Let's Encrypt",
                  access: 'Public',
                  status: 'Online',
                });
              }
            } else {
              console.log('no sub router srv: ', name);
              results.push({
                name,
                source: host.map((s) => s + listen),
                destination: [{ path: '', handle: handle[0] }], // TODO: foreach handle
                ssl: "Let's Encrypt",
                access: 'Public',
                status: 'Online',
              });
            }
          }
        });
      }
    });
  } else {
    results.push({
      name,
      source: listen,
      destination: routes
        .reduce(routeReducer, Object.assign([], { parent: '' }))
        .sort((a, b) => a.path.length - b.path.length),
      ssl: 'None',
      access: 'Public',
      status: 'Online',
    });
  }

  return results;
}

export function Hosts() {
  const classes = useStyles();
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/api/config/apps')
      .then((response) => response.json())
      .then((apps) => {
        console.log(apps.http.servers);
        console.log(apps.tls);
        setRows(
          // Object.entries<Service>(apps.http.servers).map<Row>(createData),
          Object.entries<Service>(apps.http.servers).reduce<Row[]>(
            serveReducer,
            [],
          ),
        );
      });
  }, []);

  return (
    <Box pt={2}>
      <Box mb={2}>
        <Button
          size="small"
          color="primary"
          style={{ float: 'right' }}
          onClick={() => setOpen(true)}
        >
          {'Add Host'}
        </Button>
        <Typography variant="h5">Hosts</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell width="64px">&nbsp;</TableCell>
              <TableCell width="30%">SOURCE</TableCell>
              <TableCell width="25%">DESTINATION</TableCell>
              <TableCell width="15%">SSL</TableCell>
              <TableCell width="100px">ACCESS</TableCell>
              <TableCell width="100px">STATUS</TableCell>
              <TableCell width="64px">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows.map(HostTableRow)}</TableBody>
        </Table>
      </TableContainer>
      <HostDialog open={open} data={{}} onClose={() => setOpen(false)} />
    </Box>
  );
}
