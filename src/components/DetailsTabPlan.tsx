import { h } from 'preact';
import { useState } from 'preact/hooks';
import Box, { BoxProps } from '@mui/material/Box';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Android12Switch } from './Android12Switch';

type TabPanelProps = {
  currentIndex: string;
} & BoxProps;

const filter = createFilterOptions<string>();

export const DetailsTabPlan = ({ currentIndex, ...props }: TabPanelProps) => {
  const [value, setValue] = useState<Domain[]>([]);
  return (
    <Box hidden={currentIndex != 'details'} {...props}>
      <Autocomplete
        multiple
        fullWidth
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting =
            options.some((v) => inputValue === v) ||
            value.some((v) => inputValue == v);
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
      <Box display="flex">
        <Autocomplete
          // value={'http'}
          onChange={(event, newValue) => {}}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          disableClearable
          options={['http', 'https']}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
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
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{ width: '50%', mx: 2 }}
        />
        <TextField
          label="Forward Port"
          type="number"
          defaultValue={80}
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{ width: '24%' }}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={<Android12Switch />}
          label="Cache Assets"
          sx={{ width: '48%', my: 1 }}
        />
        <FormControlLabel
          control={<Android12Switch />}
          label="Block Common Exploits"
          sx={{ m: 1 }}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={<Android12Switch />}
          label="Websockets Support"
          sx={{ my: 1 }}
        />
      </Box>
    </Box>
  );
};
