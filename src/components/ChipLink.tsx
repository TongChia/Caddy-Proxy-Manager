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
import { h, Fragment } from 'preact';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useState } from 'preact/hooks';

const useStyles = makeStyles({
  chip: {
    marginRight: '10px',
    borderRadius: '4px',
    padding: '0 4px',
    color: '#555',
    '&:hover': {
      color: 'white',
      background: green[400],
    },
  },
  icon: {
    fontSize: '1rem',
    background: green[400],
    color: 'white',
  },
});

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

export function SourceChip({ listen, source }: Row) {
  const classes = useStyles();

  if (source?.length)
    return (
      <>
        {source.map((s) => (
          <Chip
            size="small"
            label={' ' + s + ' '}
            onClick={() => window.open(`http://${s}`, '_blank')}
            className={classes.chip}
          />
        ))}
      </>
    );

  return (
    <Chip
      size="small"
      label={'*' + listen}
      onClick={() => window.open(`http://${document.domain}${listen}`)}
      className={classes.chip}
    />
  );
}

export function MyTableRow(row: Row) {
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
        <TableCell component="th" scope="row">
          {SourceChip(row)}
        </TableCell>
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
                      <TableCell width="30%">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Icon fontSize="small">subdirectory_arrow_right</Icon>
                        <Chip size="small" label={d.path} />
                      </TableCell>
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
