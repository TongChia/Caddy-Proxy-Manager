import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Android12Switch } from '../Android12Switch';
import type { UseFormReturn } from 'react-hook-form';

export type ProxyHandleInputs = {
  proxy?: {
    schema: 'http' | 'https' | 'h2c' | 'srv+http' | 'srv+https';
    host: string;
    port: number;
    request_id?: boolean;
    ws_support: boolean;
    cache_assets: boolean;
    access_list_id?: string;
  };
};
type HandleEditorProps = {
  size?: 'small' | 'medium';
  form: UseFormReturn<ProxyHandleInputs>;
};

export function ProxyHost({ form, size }: HandleEditorProps) {
  const { register, setValue } = form;

  useEffect(() => {
    return () => setValue('proxy', undefined);
  }, ['init']);

  return (
    <Box>
      <Box display="flex">
        <Autocomplete
          {...register('proxy.schema')}
          onChange={(event, newValue) =>
            setValue('proxy.schema', newValue as 'http' | 'https')
          }
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          disableClearable
          freeSolo
          size={size}
          options={['http', 'https']}
          defaultValue={'http'}
          renderInput={(params) => (
            <TextField
              {...params}
              size={size}
              required
              margin="normal"
              label="Schema"
              InputLabelProps={{ shrink: true }}
            />
          )}
          sx={{ width: '24%' }}
        />
        <TextField
          label="Forward Hostname / IP"
          required
          size={size}
          margin="normal"
          sx={{ width: '50%', mx: 2 }}
          {...register('proxy.host')}
        />
        <TextField
          label="Forward Port"
          type="number"
          defaultValue={80}
          required
          size={size}
          margin="normal"
          sx={{ width: '24%' }}
          {...register('proxy.port')}
        />
      </Box>
      <Box>
        <FormControlLabel
          {...register('proxy.cache_assets')}
          control={<Android12Switch />}
          label="Cache Assets"
          sx={{ width: '50%', my: 1 }}
        />
        <FormControlLabel
          {...register('proxy.ws_support')}
          control={<Android12Switch />}
          label="Websockets Support"
          sx={{ width: '48%', my: 1 }}
        />
      </Box>
    </Box>
  );
}
