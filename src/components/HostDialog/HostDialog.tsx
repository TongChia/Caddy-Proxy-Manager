import { h, Fragment } from 'preact';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { IconTab } from '../IconTab';
import { useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import { DetailsTabPlan, DetailsInputs } from './TabPlan/DetailsTabPlan';
import { SSLTabPlan, SSLInputs } from './TabPlan/SSLTabPlan';
import { createHost } from '../../api';
import { MyDialog } from '../MyDialog';
import { blueGrey } from '@mui/material/colors';
import { AdvancedInputs, AdvancedTabPlan } from './TabPlan/AdvancedTabPlan';
import { SubrouteTabPlan } from './TabPlan/SubrouteTabPlan';

type HostDialogProps = {
  open: boolean;
  data?: HostRow;
  onClose: (x?: any) => void;
  refresh: () => void;
};

type TabIndex = 'details' | 'subroute' | 'ssl' | 'advanced';

const DialogTabs = (props: TabsProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: blueGrey[100] }}>
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

type Inputs = SSLInputs & DetailsInputs & AdvancedInputs;

export const HostDialog = ({
  open,
  data,
  onClose,
  refresh,
}: HostDialogProps) => {
  const [currentIndex, setTabIndex] = useState<TabIndex>('details');
  const [disabled, setDisabled] = useState(false);
  const form = useForm<Inputs>();
  const tabPlanProps = { currentIndex, form };
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
    <MyDialog
      open={open}
      onClose={onClose}
      title={'Add Hosts'}
      formId={'host-form'}
      disabled={disabled}
      subtitle={
        <DialogTabs value={currentIndex} onChange={(e, n) => setTabIndex(n)} />
      }
    >
      <Box
        id="host-form"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DetailsTabPlan {...tabPlanProps} />
        <SubrouteTabPlan {...tabPlanProps} />
        <SSLTabPlan {...tabPlanProps} />
        <AdvancedTabPlan {...tabPlanProps} />
      </Box>
    </MyDialog>
  );
};
