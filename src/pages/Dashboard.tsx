import { h } from 'preact';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid';
import Paper, { PaperProps } from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { blue, green } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

type Status = 'success' | 'info' | 'warning' | 'error';

const Item = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'status',
})<PaperProps & { status: Status }>(({ status, theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  lineHeight: '48px',
  '&>.MuiIcon-root': {
    background: theme.palette[status].main,
    borderRadius: 4,
    color: 'white',
    width: 48,
    height: 48,
    lineHeight: '48px',
    marginTop: -18,
    marginBottom: -18,
  },
  '&>a.MuiTypography-root': {
    textDecoration: 'none',
    marginLeft: 18,
  },
}));

export function Dashboard() {
  const { t } = useTranslation();
  const items: {
    status: Status;
    icon: string;
    n: number;
    text: string;
    path: string;
  }[] = [
    { status: 'info', icon: 'dns', n: 0, text: 'Hosts', path: '/hosts' },
    {
      status: 'success',
      icon: 'shield',
      n: 0,
      text: 'SSL Certificates',
      path: '/certificates',
    },
    {
      status: 'warning',
      icon: 'pan_tool',
      n: 0,
      text: 'Denied Access',
      path: '/access',
    },
    { status: 'error', icon: 'error', n: 0, text: 'Errors', path: '/' },
  ];
  return (
    <Box pt={4}>
      <Box mb={2}>
        <Typography variant="h5" color={blue['700']}>
          {`${t('Hi')} ${'Admin'}`}
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {items.map(({ status, icon, n, text, path }) => (
            <Grid item xs={3}>
              <Item status={status}>
                <Icon>{icon}</Icon>
                <Typography
                  component="a"
                  href={path}
                  variant={'subtitle1'}
                  color={blue['700']}
                >
                  {n} &nbsp; {t(text)}
                </Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
