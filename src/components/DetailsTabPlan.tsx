import { h } from 'preact';
import Box from '@mui/material/Box';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Android12Switch } from './Android12Switch';
import type { UseFormReturn } from 'react-hook-form';

export type DetailsInputs = {
  domains?: string[];
  proxy?: {
    schema: string;
    host: string;
    port: string;
  };
  cacheAssets?: boolean;
  blockCommon?: boolean;
  wsSupport?: boolean;
};

const filter = createFilterOptions<string>();

export const DetailsTabPlan = ({
  currentIndex,
  form: { register, setValue, getValues, watch },
}: {
  currentIndex: string;
  form: UseFormReturn<DetailsInputs>;
}) => {
  return (
    <Box hidden={currentIndex != 'details'}>
      <Autocomplete
        multiple
        fullWidth
        {...register('domains')}
        onChange={(event, newValue) => setValue('domains', newValue)}
        filterOptions={(options: string[], params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options
            .concat(getValues('domains') || [])
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
      <Box display="flex">
        <Autocomplete
          {...register('proxy.schema')}
          onChange={(event, newValue) => setValue('proxy.schema', newValue)}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          disableClearable
          freeSolo
          options={['http', 'https']}
          defaultValue={'http'}
          renderInput={(params) => (
            <TextField {...params} required margin="normal" label="Schema" />
          )}
          sx={{ width: '24%' }}
        />
        <TextField
          label="Forward Hostname / IP"
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{ width: '50%', mx: 2 }}
          {...register('proxy.host')}
        />
        <TextField
          label="Forward Port"
          type="number"
          defaultValue={80}
          required
          margin="normal"
          sx={{ width: '24%' }}
          {...register('proxy.port')}
        />
      </Box>
      <Box>
        <FormControlLabel
          {...register('cacheAssets')}
          control={<Android12Switch />}
          label="Cache Assets"
          sx={{ width: '48%', my: 1 }}
        />
        <FormControlLabel
          {...register('blockCommon')}
          control={<Android12Switch />}
          label="Block Common Exploits"
          sx={{ m: 1 }}
        />
      </Box>
      <Box>
        <FormControlLabel
          {...register('wsSupport')}
          control={<Android12Switch />}
          label="Websockets Support"
          sx={{ my: 1 }}
        />
      </Box>
    </Box>
  );
};
