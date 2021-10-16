import { h, Fragment } from 'preact';
import Icon, { IconProps } from '@mui/material/Icon';
import Chip, { ChipProps } from '@mui/material/Chip';
import { green, grey } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';

type DomainChipProps = {
  url?: string;
  ssl?: boolean;
  label: string;
} & ChipProps;

export const DomainChip = ({ url, ssl, label }: DomainChipProps) => (
  <Chip
    size="small"
    icon={
      ssl
        ? ((<Icon style={{ fontSize: 14 }}>https</Icon>) as JSX.Element)
        : undefined
    }
    label={label}
    onClick={url ? () => window.open(url, '_blank') : undefined}
    sx={{
      margin: '2px',
      borderRadius: '3px',
      '&:hover': {
        color: 'white',
        background: grey['500'],
      },
      '&.with-ssl:hover': {
        color: 'white',
        background: green[400],
        '&>.MuiChip-icon': {
          color: 'white',
        },
      },
    }}
    className={ssl ? 'with-ssl ' : ''}
  />
);
//
// export const SrcChip2 = styled(Chip, {
//   size: 'small',
//   icon: undefined,
// })<ChipProps>(({ theme }) => ({}));

export const DestIcon = styled(Icon, {
  shouldForwardProp: (prop) => prop !== 'status',
})<IconProps & { status: string }>(({ status, theme }) => ({
  fontSize: 14,
  background: status == 'success' ? green[400] : grey[400],
  color: 'white',
  width: 18,
  height: 18,
  lineHeight: '18px',
  borderRadius: 18,
}));

export const DestChip = ({ path, handle }: FlatRoute) => {
  let icon = 'code',
    text = '';
  if (!handle) return '';
  if (handle.handler == 'reverse_proxy') {
    icon = 'sync_alt';
    text = handle.upstreams.map(({ dial }) => dial).join(' ');
  }
  if (handle.handler == 'static_response') {
    icon = 'keyboard_backspace';
    text = '"' + handle.body + '"';
  }
  if (handle.handler == 'file_server') {
    icon = 'code';
    text = handle.root || '/';
  }
  return (
    <Chip
      size="small"
      variant="outlined"
      icon={(<DestIcon status="success">{icon}</DestIcon>) as JSX.Element}
      label={text}
      sx={{
        '& .MuiChip-icon': {
          fontSize: 14,
          background: 'success',
          color: 'white',
          width: 18,
          height: 18,
          lineHeight: '18px',
          borderRadius: 18,
        },
      }}
    />
  );
};

type StatusChipProps = {
  status?: 'success' | 'error';
} & ChipProps;
export const StatusChip = ({ status, label }: StatusChipProps) => {
  return (
    <Chip
      size="small"
      icon={(<Icon>fiber_manual_record</Icon>) as JSX.Element}
      label={label}
      sx={{
        backgroundColor: 'transparent',
        '& .MuiChip-icon': {
          fontSize: 'smaller',
          lineHeight: 0.8,
          color: status == 'success' ? green[400] : green[400],
        },
      }}
    />
  );
};
