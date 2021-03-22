import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: '\'Montserrat\', sans-serif',
  },
  overrides: {
    MuiTypography: {
      root: {
        wordWrap: 'break-word',
      },
    },
  },
});

export default theme;
