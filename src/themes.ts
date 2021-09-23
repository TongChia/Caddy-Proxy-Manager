import { useMemo } from 'preact/hooks';
import { createTheme, Theme } from '@mui/material/styles';
// import { blue } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useToggle } from './utils';

export function useTheme(): [Theme, () => void] {
  // TODO: ↓ === false
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, toggleTheme] = useToggle(prefersDarkMode);

  const theme = useMemo(() => {
    const backgroundImage = darkMode
      ? 'linear-gradient(45deg, #FE6B8B 30%, #D31EE9 90%)'
      : 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)';
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        // primary: {
        //   main: blue['900'],
        // },
      },
      components: {
        // MuiCssBaseline: {},
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundImage,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            textPrimary: {
              backgroundImage,
              borderRadius: 3,
              border: 0,
              color: 'white',
              // height: 48,
              // padding: '0 30px',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
          },
        },
      },
    });
  }, [darkMode]);

  return [theme, toggleTheme];
}
