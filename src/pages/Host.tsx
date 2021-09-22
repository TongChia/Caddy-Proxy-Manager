import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { HostTableRow } from '../components/HostTable';
import { getHosts } from '../api';

export function Hosts() {
  // const classes = useStyles();
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getHosts().then(setRows).catch(console.error);
  }, []);

  return (
    <Box pt={2}>
      <Box mb={2}>
        <Button
          size="small"
          color="primary"
          sx={{ float: 'right' }}
          onClick={() => setOpen(true)}
        >
          {'Add Host'}
        </Button>
        <Typography variant="h5">Hosts</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 640 }}>
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
    </Box>
  );
}
