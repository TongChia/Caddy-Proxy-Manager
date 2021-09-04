import { createTheme } from '@material-ui/core/styles';

export const light = createTheme({
  palette: {
    // primary: {
    //   // main: '#FE6B8B',
    // },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.App': {
          // 'background-color': '#FFFFF3',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      },
    },
    MuiButton: {
      textPrimary: {
        backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
});

export const dark = createTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.App': {
          // 'background-color': '#282c34',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundImage: 'linear-gradient(45deg, #B634C5 30%, #FE6B8B 90%)',
      },
    },
    MuiButton: {
      textPrimary: {
        backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
});