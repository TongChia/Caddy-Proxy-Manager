import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useToggle } from '../utils';
import { useTranslation } from 'react-i18next';
import { getCerts } from '../api';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { DomainChip } from '../components/Chips';
import { SSLCertDialog } from '../components/SSLCertDialog';
import { route } from 'preact-router';

export function Certificates() {
  const [rows, setRows] = useState<Policy[]>([]);
  const [open, toggleOpen] = useToggle();
  const { t, i18n } = useTranslation();
  const refresh = () => {
    getCerts()
      .then((results) => setRows(results))
      .catch((e) => {
        if (e.response?.status == 401) route('/login', true);
      });
  };

  useEffect(refresh, ['init']);

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
          {t('Add SSL Certificates')}
        </Button>
        <Typography variant="h5" color={blue['700']}>
          {t('Certificates')}
        </Typography>
      </Box>
      {!rows.length ? (
        <Paper sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4">There are no Access Lists</Typography>
          <Typography variant={'subtitle1'}>
            There are no SSL Certificates
          </Typography>
          <Box sx={{ pt: 3 }}>
            <Button variant={'contained'}>{t('Add SSL Certificates')}</Button>
          </Box>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 640 }}>
            <TableHead>
              <TableRow sx={{ textTransform: 'uppercase' }}>
                <TableCell width="16px">&nbsp;</TableCell>
                <TableCell>{t('Name')}</TableCell>
                <TableCell>{t('Certificate Provider')}</TableCell>
                <TableCell>{t('Expires')}</TableCell>
                <TableCell width="64px">&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ issuers, subjects }) => (
                <TableRow key={subjects?.join(';')}>
                  <TableCell width="16px">&nbsp;</TableCell>
                  <TableCell>
                    {subjects?.map((s) => h(DomainChip, { label: s }))}
                  </TableCell>
                  <TableCell>
                    {issuers?.slice(-1).map((s) => (
                      <Typography
                        component="span"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {t(s.module)}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>{new Date().toLocaleString()}</TableCell>
                  <TableCell width="64px">&nbsp;</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <SSLCertDialog
        open={open}
        refresh={refresh}
        onClose={() => toggleOpen(false)}
      />
    </Box>
  );
}
