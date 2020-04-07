import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Montserrat"'].join(', '),
    fontSize: 14,
    h1: {
      // could customize the h1 variant as well
    },
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: { main: "#759CFC" }
  }
});
