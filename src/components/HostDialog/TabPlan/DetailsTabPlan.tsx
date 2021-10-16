import { h } from 'preact';
import Box from '@mui/material/Box';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { UseFormReturn } from 'react-hook-form';
import { HandleEditor, HandleInputs } from '../../HandleEditor';

export type DetailsInputs = {
  domains?: string[];
} & HandleInputs;

const filter = createFilterOptions<string>();

type DetailsTabPlanProps = {
  currentIndex: string;
  form: UseFormReturn<DetailsInputs>;
};
export const DetailsTabPlan = ({ currentIndex, form }: DetailsTabPlanProps) => {
  const { register, setValue, getValues, watch } = form;
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
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
      <HandleEditor form={form}></HandleEditor>
    </Box>
  );
};
