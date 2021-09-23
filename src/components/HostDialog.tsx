import { h, Fragment } from 'preact';
import Dialog from 'rc-dialog';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { IconTab } from './IconTab';
import { useState } from 'preact/hooks';
import { DetailsTabPlan } from './DetailsTabPlan';

type HostDialogProps = {
  open: boolean;
  data?: Row;
  onClose: () => void;
};

type TabIndex = 'details' | 'subroute' | 'ssl' | 'advanced';

const DialogTabs = (props: TabsProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs {...props}>
        <IconTab value="details" icon={'details'} label={'Details'} />
        <IconTab
          value="subroute"
          icon={'account_tree'}
          label={'Custom locations'}
        />
        <IconTab value="ssl" icon={'https'} label={'SSL'} />
        <IconTab value="advanced" icon={'settings'} label={'Advanced'} />
      </Tabs>
    </Box>
  );
};

export const HostDialog = ({ open, data, onClose }: HostDialogProps) => {
  const [tabIndex, setTabIndex] = useState<TabIndex>('details');
  return (
    <Dialog
      visible={open}
      onClose={onClose}
      title={'Hello'}
      zIndex={1150}
      bodyStyle={{ padding: 0 }}
    >
      <DialogTabs value={tabIndex} onChange={(e, n) => setTabIndex(n)} />
      <DialogContent>
        <DetailsTabPlan currentIndex={tabIndex} />
      </DialogContent>
      <DialogActions>
        <Button>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};
