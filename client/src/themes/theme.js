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
        color: '#039be5'
      },
      underlineHover: {
        '&:hover': {
          textDecoration: 'none'
        }
      }
    },
    MuiInputLabel: {
      root: {
        color: 'black',
        fontWeight: '500',
        width: '100%',
        textAlign: 'center',
      }
    } 
  }
});
