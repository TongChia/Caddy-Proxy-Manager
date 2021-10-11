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

type ACMEDialogProps = { open: boolean; refresh: any } & DialogProps;
type Inputs = {
  subjects?: string[];
  email?: string;
  dns?: {
    api: string;
    token: string;
  };
};

const filter = createFilterOptions<string>();

export const ZeroSSLDialog = ({ open, onClose, refresh }: ACMEDialogProps) => {
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const onSubmit = ({ subjects, email }: Inputs) => {
    console.log({ subjects, email });
  };

  return (
    <Dialog
      visible={open}
      onClose={onClose}
      title={'ZeroSSL'}
      zIndex={1150}
      animation={'custom'}
      bodyStyle={{ padding: 0 }}
      wrapStyle={{ disable: 'block', visibility: open ? 'visible' : 'hidden' }}
    >
      <DialogContent>
        <Box
          id="zerossl-form"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Autocomplete
            multiple
            fullWidth
            {...register('subjects')}
            onChange={(event, newValue) => setValue('subjects', newValue)}
            filterOptions={(options: string[], params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options
                .concat(getValues('subjects') || [])
                .includes(inputValue);
              if (inputValue !== '' && !isExisting)
                return filtered.concat(inputValue);
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={[] as string[]}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                required
                margin="dense"
                label="Domain Names"
                placeholder="example.com"
              />
            )}
          />
          <TextField
            {...register('email')}
            fullWidth
            required
            margin="normal"
            label="Email Address for ZeroSSL"
            placeholder="admin@example.com"
          />
          <FormControlLabel
            control={<Android12Switch />}
            label="Use a DNS Challenge"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={disabled}>
          Cancel
        </Button>
        <Button
          form="my-form"
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
