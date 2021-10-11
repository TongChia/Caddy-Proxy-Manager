import { h, Fragment } from 'preact';
import Dialog from 'rc-dialog';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { IconTab } from './IconTab';
import { useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import { DetailsTabPlan, DetailsInputs } from './DetailsTabPlan';
import { SSLTabPlan, SSLInputs } from './SSLTabPlan';
import { createHost } from '../api';

type HostDialogProps = {
  open: boolean;
  data?: HostRow;
  onClose: (x: any) => void;
  refresh: () => void;
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

type Inputs = SSLInputs & DetailsInputs;

export const HostDialog = ({
  open,
  data,
  onClose,
  refresh,
}: HostDialogProps) => {
  const [tabIndex, setTabIndex] = useState<TabIndex>('details');
  const [disabled, setDisabled] = useState(false);
  const form = useForm<Inputs>();
  const onSubmit = ({ domains, proxy, ssl }: Inputs) => {
    if (domains && proxy) {
      setDisabled(true);
      createHost({
        host: domains,
        port: [':80'],
        handle: {
          handler: 'reverse_proxy',
          upstreams: [{ dial: `${proxy.host}:${proxy.port}` }],
        },
      })
        .then(console.log)
        .catch(console.error)
        .finally(() => {
          onClose(false);
          refresh();
          setDisabled(false);
        });
    }
  };

  return (
    <Dialog
      visible={open}
      onClose={onClose}
      title={'Hello'}
      zIndex={1150}
      animation={'custom'}
      bodyStyle={{ padding: 0 }}
      wrapStyle={{ disable: 'block', visibility: open ? 'visible' : 'hidden' }}
    >
      <DialogTabs value={tabIndex} onChange={(e, n) => setTabIndex(n)} />
      <DialogContent>
        <Box
          id="my-form"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <DetailsTabPlan currentIndex={tabIndex} form={form} />
          <SSLTabPlan currentIndex={tabIndex} form={form} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={disabled}>
          Cancel
        </Button>
        <Button
          form="my-form"
          type="submit"
          disabled={disabled}
          variant="contained"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
