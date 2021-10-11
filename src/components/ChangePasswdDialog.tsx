import { useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import Dialog, { DialogProps } from 'rc-dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { h } from 'preact';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Android12Switch } from './Android12Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';

type MyDialogProps = { open: boolean; refresh: any } & DialogProps;
type Inputs = {
  current?: string;
  password?: string;
  confirm?: string;
};

const filter = createFilterOptions<string>();

export const ChangePasswdDialog = ({
  open,
  onClose,
  refresh,
}: MyDialogProps) => {
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const { t, i18n } = useTranslation();
  const onSubmit = ({ current, password, confirm }: Inputs) => {
    console.log({ current, password, confirm });
  };

  return (
    <Dialog
      visible={open}
      onClose={onClose}
      title={t(['Change', 'Password'])}
      zIndex={1150}
      animation={'custom'}
      bodyStyle={{ padding: 0 }}
      wrapStyle={{ disable: 'block', visibility: open ? 'visible' : 'hidden' }}
    >
      <DialogContent>
        <Box
          id="passwd-form"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register('current', { required: true })}
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
              pattern:
                /^[0-9a-zA-Z!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{6,64}$/,
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={disabled}>
          Cancel
        </Button>
        <Button
          form="passwd-form"
          type="submit"
          disabled={disabled}
          variant="contained"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
