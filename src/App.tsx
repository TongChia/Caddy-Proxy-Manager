import { h } from 'preact';
import Router, { route } from 'preact-router';
import Match from 'preact-router/match';
import cookies from 'js-cookie';
import logo from './logo.svg';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Tabs from '@mui/material/Tabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from './themes';
import { IconTab } from './components/IconTab';
import { routes } from './routes';
import { Login } from './pages/Login';
import 'rc-dialog/assets/index.css';
import { parseJwt } from './utils';

function App() {
  const [theme, toggleTheme] = useTheme();
  const { t, i18n } = useTranslation();
  const handleRoute = async (e: any) => {
    if (e.url != '/login' && !cookies.get('access_token'))
      route('/login', true);
  };
  const logout = () => {
    cookies.remove('access_token', { path: '' });
    route('/login', true);
  };
  const isDarkTheme = theme.palette.mode == 'dark';

  console.log(parseJwt(cookies.get('access_token') || ''));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router onChange={handleRoute}>
        {/* @ts-ignore */}
        <Login path="/login" version={__SNOWPACK_ENV__.APP_VERSION} />
        {/* @ts-ignore */}
        <Box path="/:rest*" pt={8}>
          <AppBar>
            <Container maxWidth="lg" disableGutters>
              <Toolbar sx={{}}>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    border: '2px solid white',
                    width: 36,
                    borderRadius: 36,
                  }}
                />
                <Typography sx={{ flexGrow: 1, color: 'white' }} variant="h6">
                  &nbsp; Caddy Proxy Manager
                </Typography>
                <IconButton onClick={toggleTheme} sx={{ color: 'white' }}>
                  <Icon>{isDarkTheme ? 'brightness_4' : 'brightness_5'}</Icon>
                </IconButton>
                <IconButton
                  onClick={() => {
                    i18n.changeLanguage(
                      i18n.language.startsWith('en') ? 'zh-CN' : 'en',
                    );
                  }}
                  sx={{ color: 'white' }}
                >
                  <Icon>translate</Icon>
                </IconButton>
                <IconButton onClick={logout} sx={{ color: 'white' }}>
                  <Icon>logout</Icon>
                </IconButton>
              </Toolbar>
            </Container>
          </AppBar>
          <AppBar position="static" color="default">
            <Container maxWidth="lg" disableGutters>
              <Match>
                {(match: { path: string }) => (
                  <Tabs
                    value={match.path}
                    onChange={(e, v) => route(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {Object.values(routes).map(({ icon, label, path }) => (
                      <IconTab icon={icon} label={t(label)} value={path} />
                    ))}
                  </Tabs>
                )}
              </Match>
            </Container>
          </AppBar>
          <Container maxWidth="lg">
            <Router>
              {Object.values(routes).map(({ page, path }) => h(page, { path }))}
            </Router>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
