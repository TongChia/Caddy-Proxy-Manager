import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Icon,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
} from '@material-ui/core';
import { Destination, MyTableRow, SourceChip } from '../components/ChipLink';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

function createData([name, srv]: [string, Service], i: number, o: any[]): Row {
  const { routes, listen } = srv;
  const source: string[] = [];
  const destination = routes
    .reduce(routeReducer, Object.assign([], { parent: '' }))
    .sort((a, b) => a.path.length - b.path.length);

  routes.forEach(({ match }) => {
    if (match) {
      match.forEach(({ host }) => {
        if (host?.length) {
          host.forEach((r) => {
            if (![':80', ':443'].includes(listen[0])) source.push(r + listen);
          });
        }
      });
    }
  });

  return {
    name,
    listen,
    source,
    destination,
    ssl: "Let's Encrypt",
    access: 'Public',
    status: 'Online',
  };
}

export function Hosts() {
  const classes = useStyles();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    fetch('/api/config/apps')
      .then((response) => response.json())
      .then((apps) => {
        console.log(apps.http.servers);
        console.log(apps.tls);
        setRows(
          Object.entries<Service>(apps.http.servers).map<Row>(createData),
        );
      });
  }, []);

  // console.log(rows);

  return (
    <Box pt={2}>
      <Box mb={2}>
        <Typography variant="h5">Hosts</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
          <TableBody>{rows.map(MyTableRow)}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
