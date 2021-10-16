import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover/Popover';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import type { UseFormReturn } from 'react-hook-form';
import { useToggle } from '../../utils';
import { blueGrey, green, grey } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { ProxyHandleInputs, ProxyHost } from './ProxyHost';

type KeyMap = { key: string; value: string };

export type HandleInputs = ProxyHandleInputs & {
  path?: string;
  file_server?: {
    root: Path;
    index: string;
    browse: boolean;
    webdav: boolean;
    php_fpm?: {
      host: Domain;
      port: number;
    };
    pre_compressed: boolean;
    disable_canonical_uris: boolean;
    access_list_id?: string;
  };
  redirection?: {
    schema: 'auto' | 'http' | 'https';
    forward: Domain; // redir https://example.com
    code: 301 | 302 | 'html';
    preserve_path: boolean; // redir https://example.com{uri}
  };
  static_response?: {
    headers: KeyMap[];
    body: string;
    code: number;
    trace?: boolean; // debug
  };
  abort?: {
    // 404 hosts
    html?: string; // 404 template
  };
  cgi?: {
    command: Path;
    args: string;
    env: KeyMap[];
    pass_env: string[];
    directory: Path;
    timeout: string;
    log?: Path;
  };
};
type HandleEditorProps = {
  size?: 'small' | 'medium';
  form: UseFormReturn<HandleInputs>;
  defineLocation?: boolean;
};
type Option = {
  label: string;
  value: string;
};

const options = ['Reverse Proxy', 'Static Response', 'Rewrite', 'File Server'];

export function HandleEditor({
  form,
  size,
  defineLocation,
}: HandleEditorProps) {
  const onChange = () => {};
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode == 'dark';
  const { t, i18n } = useTranslation();
  const [open, handleToggle] = useToggle();
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { register, setValue } = form;

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    handleToggle(false);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    handleToggle(false);
  };
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 1,
        p: 1,
        my: 2,
      }}
    >
      <Box
        ref={anchorRef}
        sx={{
          mt: -3,
          background: isDarkTheme ? '#383838' : 'white',
          width: 'max-content',
        }}
      >
        <Typography
          component={'span'}
          sx={{
            mx: 0.5,
            color: isDarkTheme
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(0, 0, 0, 0.5)',
            fontSize: 12,
          }}
        >
          {t('Handler')} * :
        </Typography>
        <Typography
          variant={'subtitle2'}
          component={'span'}
          color={green[700]}
          onClick={handleToggle}
        >
          {options[selectedIndex]}
        </Typography>
        <IconButton
          size="small"
          disableRipple
          disableFocusRipple
          disableTouchRipple
          onClick={handleToggle}
          color={'info'}
        >
          <Icon>arrow_drop_down</Icon>
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorRef.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography variant={'body2'} px={2} py={1} color={blueGrey[300]}>
            The content of the Popover.
          </Typography>
          <MenuList>
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </Popover>
      </Box>
      {defineLocation && (
        <TextField
          label="Define location"
          required
          fullWidth
          size={size}
          margin="normal"
          {...register('path')}
        />
      )}
      <ProxyHost size={size} form={form} />
    </Box>
  );
}
