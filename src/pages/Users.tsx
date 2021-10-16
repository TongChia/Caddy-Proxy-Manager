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
import md5 from 'js-md5';

// import Popover from '@mui/material/Popover';
import { ChangePasswdDialog } from '../components/ChangePasswdDialog';

export function Users() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [rows, setRows] = useState<User[]>([]);
  const [open, toggleOpen] = useToggle();
  const [changePass, setChangePass] = useState<{
    id?: string;
    current?: BcryptPassword;
  }>({});
  const { t, i18n } = useTranslation();
  const refresh = () => {
    getUsers()
      .then((results) => setRows(results))
      .catch((e) => {
        if (e.response?.status == 401) route('/login', true);
      });
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          {t('Add User')}
        </Button>
        <Typography variant="h5" color={blue['700']}>
          {t('Users')}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 640 }}>
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <TableCell width="64px">&nbsp;</TableCell>
              <TableCell width="30%">{t('Name')}</TableCell>
              <TableCell width="30%">{t('Email')}</TableCell>
              <TableCell>{t('Roles')}</TableCell>
              <TableCell width="64px">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(
              ({
                id,
                username,
                fullname,
                passwords: [current],
                created,
                email_address,
                roles,
              }) => (
                <TableRow key={id}>
                  <TableCell>
                    <Avatar
                      src={`https://www.gravatar.com/avatar/${md5(
                        email_address.address,
                      )}?d=robohash`}
                      sx={{ border: 1, borderColor: blueGrey[100] }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>{fullname || username}</Typography>
                    <Typography
                      sx={{ color: blueGrey[200], fontSize: 'small' }}
                    >
                      {`${t('Created')}: ${t('datetime', {
                        date: new Date(created),
                      })}`}
                    </Typography>
                  </TableCell>
                  <TableCell>{email_address.address}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {roles.map((r) => r.name)}
                  </TableCell>
                  <TableCell padding="none">
                    <IconButton
                      onClick={(event) => setChangePass({ id, current })}
                    >
                      <Icon>more_vert</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ChangePasswdDialog
        open={!!changePass.id}
        id={changePass.id || ''}
        refresh={refresh}
        onClose={() => setChangePass({})}
      />
    </Box>
  );
}
