import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: { main: "#DF1B1B" }
  },
  overrides: {
    MuiLink: {
      root: {
        color: 'blue'
      },
      underlineHover: {
        '&:hover': {
          textDecoration: 'none'
        }
      }
    } 
  }
});
