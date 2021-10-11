import { h } from 'preact';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from '@mui/material/Icon';
import { Android12Switch } from './Android12Switch';
import type { UseFormReturn } from 'react-hook-form';

export type SSLInputs = {
  ssl?: string;
  forceSSL?: boolean;
  http2?: boolean;
  hsts?: boolean;
  dnsChallenge?: {
    email: string;
  };
};

export const SSLTabPlan = ({
  currentIndex,
  form: { register, setValue, getValues, watch },
}: {
  currentIndex: string;
  form: UseFormReturn<SSLInputs>;
}) => {
  const options = [
    { icon: 'remove_moderator', level: 0, label: 'None' },
    { icon: 'shield', level: 1, label: 'Internal' },
  ];

  return (
    <Box hidden={currentIndex != 'ssl'}>
      <Autocomplete
        {...register('ssl')}
        onChange={(event, newValue) =>
          setValue('ssl', newValue.toString() || 'None')
        }
        freeSolo
        fullWidth
        clearOnBlur
        selectOnFocus
        disableClearable
        handleHomeEndKeys
        options={options}
        renderOption={(props, option) => {
          return (
            <Box component="li" {...props}>
              <Icon
                className="material-icons-outlined"
                color={'error'}
                sx={{ fontSize: '1rem' }}
              >
                {option.icon}
              </Icon>
              {option.label}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            required
            margin="dense"
            label="SSL Certificate"
            placeholder="Request a new SSL Certificate"
          />
        )}
      />
      <Box>
        <FormControlLabel
          {...register('forceSSL')}
          control={<Android12Switch />}
          label="Force SSL"
          sx={{ width: '48%', my: 1 }}
        />
        <FormControlLabel
          {...register('http2')}
          control={<Android12Switch />}
          label="http2 Support"
          sx={{ m: 1 }}
        />
      </Box>
      <Box>
        <FormControlLabel
          {...register('hsts')}
          control={<Android12Switch />}
          label="HSTS Enable"
          sx={{ my: 1 }}
        />
      </Box>
    </Box>
  );
};
