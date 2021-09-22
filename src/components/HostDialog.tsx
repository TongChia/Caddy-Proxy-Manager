import { h, Fragment } from 'preact';
// import { useState } from 'preact/hooks';
// import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Tabs from '@mui/material/Tabs';
// import Button from '@mui/material/Button';
// import type { DialogProps } from '@mui/material/Dialog/Dialog';
// import { IconTab } from './IconTab';
// import { Autocomplete, createFilterOptions } from '@material-ui/lab';

// const filter = createFilterOptions<string>();

export function HostDialog({
  open,
  data,
  onClose,
  ...props
}: {
  open: boolean;
  data: {};
  onClose: () => void;
}) {
  // const [hosts, setHosts] = useState(['www.baidu.com']);

  return (
    <Dialog {...props} open={open} onClose={onClose}>
      {/*<DialogTitle>{'New Host'}</DialogTitle>*/}

      {/*<DialogActions>*/}
      {/*  <Button color="primary" onClick={(e) => createHost()}>*/}
      {/*    Agree*/}
      {/*  </Button>*/}
      {/*</DialogActions>*/}
    </Dialog>
  );
}
