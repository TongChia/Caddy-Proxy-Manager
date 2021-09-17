import { h, Fragment } from 'preact';
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tabs,
  Box,
  TextFieldProps,
} from '@material-ui/core';
import type { DialogProps } from '@material-ui/core/Dialog/Dialog';
import { IconTab } from './IconTab';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useState } from 'preact/hooks';

const filter = createFilterOptions<string>();

export function HostDialog({
  data,
  onClose,
  ...props
}: { data: {} } & DialogProps) {
  const [hosts, setHosts] = useState(['www.baidu.com']);

  const createHost = () => {
    const mySrv = {
      listen: [':80'],
      routes: [
        {
          match: [
            {
              host: ['example.com'],
            },
          ],
          handle: [
            {
              handler: 'static_response',
              body: 'hello',
            },
          ],
        },
      ],
    };

    fetch('/api/config/apps/http/servers/aaaa', {
      method: 'PUT',
      body: JSON.stringify(mySrv),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Dialog {...props} onClose={onClose}>
      <DialogTitle>{'New Host'}</DialogTitle>

      <Tabs
        value={0}
        onChange={() => {}}
        indicatorColor="primary"
        textColor="primary"
      >
        <IconTab icon="home" label="Details" />
        <IconTab icon="list" label="SSL" />
      </Tabs>

      <DialogContent>
        <Box minWidth={540} my={2}>
          <Autocomplete
            multiple
            freeSolo
            clearOnBlur
            selectOnFocus
            handleHomeEndKeys
            options={hosts}
            getOptionLabel={(option) => option}
            value={hosts}
            onChange={(event, newValue) => {
              setTimeout(() => {
                setHosts(newValue);
              });
            }}
            ChipProps={{ size: 'small' }}
            filterSelectedOptions
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (params.inputValue !== '') {
                filtered.push(params.inputValue);
              }
              return filtered;
            }}
            renderInput={(params: TextFieldProps) => (
              <TextField
                {...params}
                variant="outlined"
                label={'Domain Names'}
                size="small"
                required
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {/*<Button onClick={onClose}>Disagree</Button>*/}
        <Button color="primary" onClick={(e) => createHost()}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
