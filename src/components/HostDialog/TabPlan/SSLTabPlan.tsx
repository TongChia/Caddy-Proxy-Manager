import { h } from 'preact';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from '@mui/material/Icon';
import { Android12Switch } from '../../Android12Switch';
import type { UseFormReturn } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { blueGrey } from '@mui/material/colors';
import Select from '@mui/material/Select/Select';
import keyBy from 'lodash/keyBy';

export type SSLInputs = {
  ssl?: string;
  forceSSL?: boolean;
  http2?: boolean;
  hsts?: boolean;
  dnsChallenge?: {
    email: string;
  };
};

type SSLOption = {
  color: 'error' | 'warning' | 'success';
  icon: string;
  label: string;
  value: string;
  p?: string;
};

export const SSLTabPlan = ({
  currentIndex,
  form: { register, setValue, getValues, watch },
}: {
  currentIndex: string;
  form: UseFormReturn<SSLInputs>;
}) => {
  const options: SSLOption[] = [
    {
      icon: 'remove_moderator',
      color: 'error',
      label: 'None',
      value: 'none',
      p: 'This host will not use HTTPS',
    },
    {
      icon: 'shield',
      color: 'error',
      label: 'Internal',
      value: 'internal',
      p: 'Internal Root Certificate',
    },
    {
      icon: 'shield',
      color: 'success',
      label: 'Request a new SSL Certificate',
      value: 'acme',
      p: 'with ACME SSL',
    },
  ];
  const optionByLabel: { [key: string]: SSLOption } = keyBy(options, 'value');

  return (
    <Box hidden={currentIndex != 'ssl'}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" shrink>
          SSL Certificate
        </InputLabel>
        <Select
          // labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={'SSL Certificate'}
          required
          renderValue={(selected: string) => optionByLabel[selected]?.label}
          {...register('ssl', { required: true })}
          defaultValue={'none'}
          // onChange={(event, newValue) =>
          //   typeof newValue == 'string'
          //     ? console.debug('ssl selector: ', newValue)
          //     : setValue('ssl', newValue.value || 'none')
          // }
        >
          {options.map(({ value, label, p, icon, color }) => (
            <MenuItem value={value}>
              <ListItemIcon>
                <Icon color={color} className="material-icons-outlined">
                  {icon}
                </Icon>
              </ListItemIcon>
              <Typography>
                {label}
                <Typography variant={'body2'} color={blueGrey[400]}>
                  {p}
                </Typography>
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <FormControlLabel
          {...register('forceSSL')}
          control={<Android12Switch />}
          label="Force SSL"
          sx={{ width: '48%', my: 1 }}
        />
        <FormControlLabel
          {...register('http2')}
          defaultChecked
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
