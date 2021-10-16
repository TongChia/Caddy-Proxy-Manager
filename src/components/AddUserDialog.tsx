import { useEffect, useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
// import Dialog, { DialogProps } from 'rc-dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { h } from 'preact';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { changePassword } from '../api';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import { MyDialog } from './MyDialog';
import type { DialogProps } from '../fixMui/Dialog';

type MyDialogProps = {
  open: boolean;
  id: string;
  refresh: any;
  onClose: (x?: any) => void;
} & DialogProps;
type Inputs = {
  current: string;
  password: string;
  confirm: string;
};

const passwdPattern = /^[0-9a-zA-Z!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{6,64}$/;

export const ChangePasswdDialog = ({
  open,
  id,
  onClose,
  refresh,
}: MyDialogProps) => {
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Inputs>();
  const { t, i18n } = useTranslation();
  const onSubmit = ({ current, password, confirm }: Inputs) => {
    console.log({ current, password, confirm });
    changePassword({ id, current, password })
      .then(() => onClose(false))
      .catch((e) => {
        console.error(e);
        if (e) setAlert(e.message);
      });
  };
  useEffect(() => reset(), [id]);

  const [alert, setAlert] = useState('');
  const closeAlert = () => setAlert('');

  return (
    <MyDialog
      open={open}
      onClose={onClose}
      title={t('Change') + ' ' + t('Password')}
      disabled={disabled}
    >
      <Box
        id="passwd-form"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Snackbar
          open={!!alert}
          onClose={closeAlert}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          TransitionComponent={(props) => <Slide {...props} direction="down" />}
        >
          <Alert severity="error" sx={{ width: '100%' }} onClose={closeAlert}>
            {alert}
          </Alert>
        </Snackbar>
        <TextField
          {...register('current', {
            required: true,
            pattern: { value: passwdPattern, message: '密码错误' },
          })}
          error={!!errors.current}
          helperText={errors.current?.message}
          fullWidth
          required
          margin="normal"
          type={'password'}
          label={t('Current password')}
          placeholder={'Input current password'}
        />
        <TextField
          {...register('password', {
            required: true,
            pattern: passwdPattern,
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          required
          margin="normal"
          type={'password'}
          label={t('New password')}
          placeholder={'Input New password'}
        />
        <TextField
          {...register('confirm', {
            required: true,
            validate: (v) => v == getValues('password'),
          })}
          error={!!errors.confirm}
          helperText={errors.confirm?.message}
          fullWidth
          required
          margin="normal"
          type={'password'}
          label={t('Confirm password')}
          placeholder={'Confirm password'}
        />
      </Box>
    </MyDialog>
  );
};
