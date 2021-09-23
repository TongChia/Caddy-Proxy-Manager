import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { createStyles, makeStyles } from '@mui/styles';
import { green } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

const useStyles = makeStyles((theme) =>
  createStyles({
    chip: {
      margin: 2,
      borderRadius: 3,
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
  if (handle.handler == 'file_server')
    return (
      <Chip
        avatar={
          (
            <Avatar>
              <Icon className={classes.icon}>code</Icon>
            </Avatar>
          ) as JSX.Element
        }
        size="small"
        label={handle.root || '/'}
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

export function HostTableRow({
  source,
  destination,
  ssl,
  access,
  status,
}: Row) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={source.join('-')}>
        <TableCell sx={{ padding: 1, width: 32 }}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            disabled={destination.length < 2}
          >
            <Icon>{open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</Icon>
          </IconButton>
        </TableCell>
        <TableCell>{SourceChipMapper(source)}</TableCell>
        <TableCell>{Destination(destination[0])}</TableCell>
        <TableCell>{ssl}</TableCell>
        <TableCell>{access}</TableCell>
        <TableCell>{status || 'Unknown' /* TODO: check health */}</TableCell>
        <TableCell padding="none">
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
      {destination.length >= 2 ? (
        <TableRow key={source.join('-') + 'collapse'}>
          <TableCell style={{ padding: 0, border: 'none' }} colSpan={7}>
            <Collapse in={open}>
              <Table size="small">
                <TableBody>
                  {destination.slice(1).map((d) => (
                    <TableRow>
                      <TableCell sx={{ padding: 1, width: 32 }}>
                        &nbsp;
                      </TableCell>
                      <TableCell width="30%">&nbsp;</TableCell>
                      <TableCell width="25%">{Destination(d)}</TableCell>
                      <TableCell width="15%">&nbsp;</TableCell>
                      <TableCell width="100px">{access}</TableCell>
                      <TableCell width="100px">{status}</TableCell>
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
