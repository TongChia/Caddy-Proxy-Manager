import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import logo from './logo.png';
import './App.css';
import {
  ThemeProvider,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Container,
  Box,
  Icon,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
} from '@material-ui/core';
import { light, dark } from './themes';
import { IconTab } from './components/IconTab';
import { Hosts } from './pages/Host';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    AppBar: {},
    title: {
      flexGrow: 1,
    },
    iconButton: {
      color: 'white',
    },
    p0: {
      padding: 0,
    },
    SubBar: {
      MuiIcon: {
        margin: '-6px 6px',
      },
    },
  }),
);

function App() {
  const [count, setCount] = useState(0);
  const [useDarkTheme, setTheme] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  function a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  return (
    <ThemeProvider theme={useDarkTheme ? dark : light}>
      <CssBaseline />
      <Box className="App" pt={8}>
        <AppBar>
          <Container maxWidth="lg" className={classes.p0}>
            <Toolbar>
              <img src={logo} alt="logo" width="34" />
              <Typography className={classes.title} variant="h6">
                &nbsp; Caddy Proxy Manager
              </Typography>
              <IconButton
                className={classes.iconButton}
                onClick={() => setTheme(!useDarkTheme)}
              >
                <Icon>{useDarkTheme ? 'brightness_4' : 'brightness_5'}</Icon>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <AppBar position="static" color="default" className={classes.SubBar}>
          <Container maxWidth="lg" className={classes.p0}>
            <Tabs
              value={1}
              // onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <IconTab icon="home" label="Dashboard" {...a11yProps(0)} />
              <IconTab icon="list" label="Hosts" {...a11yProps(1)} />
              <IconTab
                icon="lock_open"
                label="Access Lists"
                {...a11yProps(2)}
              />
              <IconTab
                icon="security"
                label="SSL Certificates"
                {...a11yProps(3)}
              />
              <IconTab icon="manage_accounts" label="Users" {...a11yProps(4)} />
              <IconTab icon="description" label="Audit Log" {...a11yProps(5)} />
              <IconTab icon="settings" label="Settings" {...a11yProps(6)} />
            </Tabs>
          </Container>
        </AppBar>
        <Container maxWidth="lg">
          <Hosts />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
