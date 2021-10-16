import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useToggle } from '../utils';
import { useTranslation } from 'react-i18next';
import { getUsers } from '../api';
import { blue, blueGrey } from '@mui/material/colors';
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
import { route } from 'preact-router';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import { ChangePasswdDialog } from '../components/ChangePasswdDialog';

export function Settings() {
  const [rows, setRows] = useState<{}[]>([]);
  const { t, i18n } = useTranslation();
  const refresh = () => {
    getUsers()
      .then((results) => setRows([]))
      .catch((e) => {
        if (e.response?.status == 401) route('/login', true);
      });
  };
  useEffect(refresh, ['init']);

  return (
    <Box pt={2}>
      <Box mb={2}>
        <Typography variant="h5" color={blue['700']}>
          {t('Settings')}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 640 }}>
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <TableCell>{t('Name')}</TableCell>
              <TableCell width="30%">{t('Value')}</TableCell>
              <TableCell width="64px">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{t('HTTP(s) Port')}</TableCell>
              <TableCell>
                {'80'}, {'443'}
              </TableCell>
              <TableCell padding="none">
                <IconButton onClick={(event) => {}}>
                  <Icon>more_vert</Icon>
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('PHP FPM')}</TableCell>
              <TableCell>None</TableCell>
              <TableCell padding="none">
                <IconButton onClick={(event) => {}}>
                  <Icon>more_vert</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('Default Site')}</TableCell>
              <TableCell>None</TableCell>
              <TableCell padding="none">
                <IconButton onClick={(event) => {}}>
                  <Icon>more_vert</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
