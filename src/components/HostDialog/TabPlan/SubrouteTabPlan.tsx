import { h } from 'preact';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useTranslation } from 'react-i18next';
import type { UseFormReturn } from 'react-hook-form';
import type { HandleInputs } from '../../HandleEditor';

export type SubrouteInputs = {
  subroute?: { path: string; handle: HandleInputs }[];
};

type Props = {
  currentIndex: string;
  form: UseFormReturn<SubrouteInputs>;
};

export const SubrouteTabPlan = ({
  currentIndex,
  form: { register },
}: Props) => {
  const { t, i18n } = useTranslation();
  return (
    <Box hidden={currentIndex != 'subroute'}>
      <Button variant={'contained'} startIcon={<Icon>add_circle</Icon>}>
        {t('Add')}
      </Button>
    </Box>
  );
};
