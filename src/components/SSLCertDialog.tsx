import { useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { h } from 'preact';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Android12Switch } from './Android12Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MyDialog } from './MyDialog';
import type { DialogProps } from '../fixMui/Dialog';

type ACMEDialogProps = {
  open: boolean;
  refresh: any;
  onClose: (x?: any) => void;
} & DialogProps;
type Inputs = {
  subjects?: string[];
  email?: string;
  dns?: {
    api: string;
    token: string;
  };
};

const filter = createFilterOptions<string>();

export const SSLCertDialog = ({ open, onClose, refresh }: ACMEDialogProps) => {
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const onSubmit = ({ subjects, email }: Inputs) => {
    console.log({ subjects, email });
  };

  return (
    <MyDialog open={open} onClose={onClose} title={'Add SSL Cert'}>
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
              InputLabelProps={{ shrink: true }}
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
          disabled
          control={<Android12Switch />}
          label="Use a DNS Challenge"
        />
      </Box>
    </MyDialog>
  );
};
