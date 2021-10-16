import { useMemo } from 'preact/hooks';
import { createTheme, Theme } from '@mui/material/styles';
import { blue, blueGrey, green } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useToggle } from './utils';

export function useTheme(): [Theme, (isDark?: any) => void] {
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
        common: {
          black: '#113',
        },
        text: {
          primary: blueGrey[100],
        },
        ...(!darkMode && {
          primary: {
            main: blue['700'],
          },
          text: {
            primary: blueGrey['700'],
          },
        }),
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
        MuiTab: {
          styleOverrides: {
            textColorPrimary: {
              color: blueGrey[400],
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              color: blueGrey['300'],
            },
          },
        },
        MuiTextField: {
          defaultProps: {
            InputLabelProps: {
              shrink: true,
            },
          },
        },
      },
    });
  }, [darkMode]);

  return [theme, toggleTheme];
}
