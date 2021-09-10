import {
  Avatar,
  Chip,
  Collapse,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { h, Fragment, createElement } from 'preact';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useState } from 'preact/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: '10px',
      borderRadius: '4px',
      '&.with-ssl:hover': {
        color: 'white',
        background: green[400],
        '&>.MuiChip-icon': {
          color: 'white',
        },
      },
    },
    icon: {
      fontSize: '14px',
      background: green[400],
      color: 'white',
    },
  }),
);

export function Destination({ path, handle }: FlatRoute) {
  const classes = useStyles();

  if (!handle) return '';
  if (handle.handler == 'reverse_proxy')
    return (
      <span>
        {handle.upstreams.map((up) => (
          <Chip
            size="small"
            avatar={
              (
                <Avatar>
                  <Icon className={classes.icon}>sync_alt</Icon>
                </Avatar>
              ) as JSX.Element
            }
            label={up.dial}
            variant="outlined"
          />
        ))}
      </span>
    );
  if (handle.handler == 'static_response')
    return (
      <Chip
        avatar={
          (
            <Avatar>
              <Icon className={classes.icon}>keyboard_backspace</Icon>
            </Avatar>
          ) as JSX.Element
        }
        size="small"
        label={'"' + handle.body + '"'}
        variant="outlined"
      />
    );

  return 'nothing!';
}

export function SourceChip(s: string) {
  const classes = useStyles();
  const label = s.startsWith(':') ? `*${s}` : s;
  const url = s.startsWith(':')
    ? `http://${document.domain + s}`
    : `http://${s}`;
  return (
    <Chip
      size="small"
      label={label}
      onClick={() => window.open(url, '_blank')}
      className={classes.chip}
    />
  );
}

function SourceChipMapper(sources: string[]) {
  const classes = useStyles();

  const ss = sources.reduce<{
    [key: string]: { label: string; url: string; ssl: boolean };
  }>((r, src) => {
    const ssl = src.endsWith(':443');
    const s = src.replace(/\:443|\:80/, '');

    if (r.hasOwnProperty(s)) {
      r[s].ssl = r[s].ssl || ssl;
    } else {
      r[s] = {
        ssl,
        label: r[s]?.label || s.startsWith(':') ? `*${s}` : s,
        url: s.startsWith(':')
          ? `http://${document.domain + s}`
          : `http://${s}`,
      };
    }
    return r;
  }, {});

  return Object.entries(ss).map(([s, { label, url, ssl }]) => (
    <Chip
      size="small"
      icon={
        ssl
          ? ((<Icon style={{ fontSize: '1rem' }}>https</Icon>) as JSX.Element)
          : undefined
      }
      label={label}
      onClick={() => window.open(url, '_blank')}
      className={(ssl ? 'with-ssl ' : '') + classes.chip}
    />
  ));
}

export function HostTableRow(row: Row) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={row.source.join('-')}>
        <TableCell width="64px">
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            disabled={row.destination.length < 2}
          >
            <Icon>{open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</Icon>
          </IconButton>
        </TableCell>
        <TableCell>{SourceChipMapper(row.source)}</TableCell>
        <TableCell>{Destination(row.destination[0])}</TableCell>
        <TableCell>{row.ssl}</TableCell>
        <TableCell>{row.access}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell padding="none">
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
      {row.destination.length >= 2 ? (
        <TableRow key={row.source.join('-') + 'collapse'}>
          <TableCell style={{ padding: 0, border: 'none' }} colSpan={7}>
            <Collapse in={open}>
              <Table size="small">
                <TableBody>
                  {row.destination.slice(1).map((d) => (
                    <TableRow>
                      <TableCell width="64px">&nbsp;</TableCell>
                      <TableCell width="30%">&nbsp;</TableCell>
                      <TableCell width="25%">{Destination(d)}</TableCell>
                      <TableCell width="15%">&nbsp;</TableCell>
                      <TableCell width="100px">{row.access}</TableCell>
                      <TableCell width="100px">{row.status}</TableCell>
                      <TableCell width="64px">&nbsp;</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}
