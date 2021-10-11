import { h } from 'preact';
import { useState } from 'preact/hooks';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { route } from 'preact-router';
import logo from '../logo.svg';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { blueGrey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { loginApi } from '../api';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert, { AlertColor } from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

type Inputs = {
  username: string;
  password: string;
};

export function Login({ path, version }: { path?: string; version: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error' as AlertColor,
  });
  const closeAlert = () => setAlert({ ...alert, open: false });
  const onSubmit = (data: Inputs) =>
    loginApi(data)
      .then(() => route('/', true))
      .catch((e) => {
        const message =
          e.response?.status == 401
            ? 'No relevant user found'
            : 'Login failed !';
        setAlert({ ...alert, open: true, message });
      });

  return (
    <Box width={680} m="auto" mt={24}>
      <Paper elevation={3}>
        <Box
          id="login-form"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          py={5}
        >
          <Snackbar
            open={alert.open}
            onClose={closeAlert}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={(props) => (
              <Slide {...props} direction="down" />
            )}
          >
            <Alert
              severity={alert.severity}
              sx={{ width: '100%' }}
              onClose={closeAlert}
            >
              {alert.message}
            </Alert>
          </Snackbar>
          <Box width="50%" textAlign={'center'} pt={3}>
            <img src={logo} width={128} />
            <Typography variant="h5" mt={1}>
              Caddy
            </Typography>
            <Typography>Proxy Manager</Typography>
            <Typography my={1}>{version}</Typography>
          </Box>
          <Box width="50%" pr={5}>
            <Typography variant="h5" my={2}>
              Login to your account
            </Typography>
            <TextField
              {...register('username', {
                required: true,
                pattern: /^[a-z][^\W_]{5,32}$/i,
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
              required
              margin="dense"
              label="Username / email"
              placeholder="webadmin"
            />
            <TextField
              {...register('password', {
                required: true,
                maxLength: 120,
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              required
              margin="normal"
              label="Password"
              type="password"
              placeholder="password"
            />
            <Box my={1}>
              <Button variant={'contained'} fullWidth type="submit">
                Sign in
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
