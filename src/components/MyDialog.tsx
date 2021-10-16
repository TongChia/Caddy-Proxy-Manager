import { h } from 'preact';
import Dialog, { DialogProps } from '../fixMui/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { blueGrey } from '@mui/material/colors';
import Box from '@mui/material/Box';

type MyDialogProps = {
  open: boolean;
  title: string;
  subtitle?: string | JSX.Element;
  formId?: string;
  onClose: () => void;
  onAgree?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
} & DialogProps;

const style = {};

export function MyDialog({
  open,
  title,
  formId,
  subtitle,
  children,
  onAgree,
  onClose,
  onCancel,
  disabled,
}: MyDialogProps) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'start',
        },
        '& .MuiDialogTitle-root': {
          borderBottom: 1,
          borderColor: blueGrey[100],
        },
      }}
    >
      <DialogTitle>{t(title)}</DialogTitle>
      <Box>{subtitle}</Box>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel || onClose} disabled={disabled}>
          {t('Cancel')}
        </Button>
        <Button
          variant={'contained'}
          onClick={onAgree}
          disabled={disabled}
          type={formId ? 'submit' : 'button'}
          form={formId}
        >
          {t('Agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
