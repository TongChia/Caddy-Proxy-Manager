import { h } from 'preact';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useEffect, useState } from 'preact/hooks';
import { useToggle } from '../utils';
import { useTranslation } from 'react-i18next';
import { getAccessLists, getCerts } from '../api';
import { route } from 'preact-router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContentText from '@mui/material/DialogContentText';
import { MyDialog } from '../components/MyDialog';

export function AccessList() {
  const [rows, setRows] = useState<AccessList[]>([]);
  const [open, toggleOpen] = useToggle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation();
  const refresh = () => {
    getAccessLists()
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
          {t('Add Access list')}
        </Button>
        <Typography variant="h5" color={blue['700']}>
          {t('Access Lists')}
        </Typography>
      </Box>
      {!rows.length ? (
        <Paper sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4">There are no Access Lists</Typography>
          <Typography variant={'subtitle1'}>
            Why don't you create one?
          </Typography>
          <Box sx={{ pt: 3 }}>
            <Button variant={'contained'}>Add Access List</Button>
          </Box>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 640 }}>
            <TableHead>
              <TableRow sx={{ textTransform: 'uppercase' }}>
                <TableCell width="64px">&nbsp;</TableCell>
                <TableCell>{t('Name')}</TableCell>
                <TableCell>{t('Authorization')}</TableCell>
                <TableCell>{t('Access')}</TableCell>
                <TableCell>{t('Satisfy')}</TableCell>
                <TableCell>{t('Proxy Hosts')}</TableCell>
                <TableCell width="64px">&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(
                ({
                  id,
                  name,
                  satisfy_any,
                  proxy_host_count,
                  items,
                  clients,
                }) => (
                  <TableRow key={id}>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{items.length}&nbsp;User</TableCell>
                    <TableCell>{clients.length}&nbsp;Rules</TableCell>
                    <TableCell>{satisfy_any ? 'Any' : 'All'}</TableCell>
                    <TableCell>{proxy_host_count || 0}</TableCell>
                    <TableCell width="64px">&nbsp;</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <MyDialog open={open} onClose={toggleOpen} title={t('Add Access List')}>
        <DialogContentText>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </DialogContentText>
      </MyDialog>
    </Box>
  );
}
