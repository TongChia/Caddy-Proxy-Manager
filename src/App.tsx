import { h } from 'preact';
// import { Router } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { light, dark } from './themes';
import { useToggle } from './utils';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    color: 'white',
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
})) as () => any;

function App() {
  const [count, setCount] = useState(0);
  const [darkTheme, toggleTheme] = useToggle();
  const { t, i18n } = useTranslation();
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
    <ThemeProvider theme={darkTheme ? dark : light}>
      <Box className="App" pt={8}>
        <AppBar>
          <Container maxWidth="lg" className={classes.p0}>
            <Toolbar>
              <img src={logo} alt="logo" width="34" />
              <Typography className={classes.title} variant="h6">
                &nbsp; Caddy Proxy Manager
              </Typography>
              <IconButton className={classes.iconButton} onClick={toggleTheme}>
                <Icon>{darkTheme ? 'brightness_4' : 'brightness_5'}</Icon>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
