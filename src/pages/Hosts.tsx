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
import { useToggle } from '../utils';
import { HostDialog } from '../components/HostDialog';
import { blue, blueGrey, cyan, green } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { route } from 'preact-router';

export function Hosts() {
  const [rows, setRows] = useState<HostRow[]>([]);
  const [open, toggleOpen] = useToggle();
  const { t, i18n } = useTranslation();
  const refresh = () => {
    getHosts()
      .then(setRows)
      .catch((e) => {
        if (e.response?.status == 401) route('/login', true);
      });
  };

  useEffect(refresh, []);

  return (
    <Box pt={2}>
      <Box mb={2}>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          sx={{ float: 'right' }}
          onClick={toggleOpen}
        >
          {t('Add Host')}
        </Button>
        <Typography variant="h5" color={blueGrey['A700']}>
          Hosts
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 840 }}>
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <TableCell width="64px">&nbsp;</TableCell>
              <TableCell>{t('Source')}</TableCell>
              <TableCell width="25%">{t('Destination')}</TableCell>
              <TableCell width="15%">{t('SSL')}</TableCell>
              <TableCell width="100px">{t('Access')}</TableCell>
              <TableCell width="100px">{t('Status')}</TableCell>
              <TableCell width="64px">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows.map(HostTableRow)}</TableBody>
        </Table>
      </TableContainer>
      <HostDialog
        open={open}
        onClose={toggleOpen}
        refresh={refresh}
        data={undefined}
      ></HostDialog>
    </Box>
  );
}
