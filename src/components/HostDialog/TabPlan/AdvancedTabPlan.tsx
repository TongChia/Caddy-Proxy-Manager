import { h } from 'preact';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { UseFormReturn } from 'react-hook-form';
import Typography from '@mui/material/Typography';

export type AdvancedInputs = {
  custom_caddyfile?: string;
};

type Props = {
  currentIndex: string;
  form: UseFormReturn<AdvancedInputs>;
};

export const AdvancedTabPlan = ({
  currentIndex,
  form: { register },
}: Props) => {
  return (
    <Box hidden={currentIndex != 'advanced'}>
      <TextField
        label={'Custom Caddy Configuration'}
        placeholder={'# Enter your custom Caddy directives here!'}
        multiline
        fullWidth
        minRows={6}
        maxRows={18}
        {...register('custom_caddyfile')}
      />
      <Typography
        component={'a'}
        href={'https://caddyserver.com/docs/caddyfile/directives'}
        fontSize={12}
      >
        Caddy directives
      </Typography>
    </Box>
  );
};
