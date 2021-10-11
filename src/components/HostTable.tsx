import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { DomainChip, DestChip, StatusChip } from './Chips';

function SourceChipMapper(sources: string[]) {
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

  return Object.entries(ss).map(([s, props]) => h(DomainChip, props));
}

const SSLChip = (policies: Policy[]) => {
  return policies.length
    ? policies.map(({ issuers }) => (
        <Chip
          size="small"
          variant="outlined"
          label={issuers?.map(({ module }) => module).join(' ') || 'Unkonw'}
        />
      ))
    : 'HTTP only';
};

export function HostTableRow({
  source,
  destination,
  ssl,
  access,
}: // status,
HostRow) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={source.join('-')}>
        <TableCell padding="checkbox" sx={{ pl: 2 }}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            disabled={destination.length < 2}
          >
            <Icon>{open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</Icon>
          </IconButton>
        </TableCell>
        <TableCell>{SourceChipMapper(source)}</TableCell>
        <TableCell>{DestChip(destination[0])}</TableCell>
        <TableCell>{SSLChip(ssl)}</TableCell>
        <TableCell>{access}</TableCell>
        <TableCell>
          {/* TODO: check health */}
          <StatusChip label={'Online'} />
        </TableCell>
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
                      <TableCell width="64px">&nbsp;</TableCell>
                      <TableCell>&nbsp; {d.path}</TableCell>
                      <TableCell width="25%">{DestChip(d)}</TableCell>
                      <TableCell width="15%">&nbsp;</TableCell>
                      <TableCell width="100px">{access}</TableCell>
                      <TableCell width="100px">&nbsp;</TableCell>
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
