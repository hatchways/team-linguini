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
    primary: { main: "#759CFC" },
    secondary: {
      main: "#759CFC",
    },
    cardColor: {
      blue: "#15A1F7",
      green: '#5ACD76',
      red: '#C70039',
      yellow: '#EA7829',
      purple: "#D057F0",
      white: "#E8E7E3"
    }
  },
  overrides: {
    MuiLink: {
      root: {
        color: "#039be5",
      },
      underlineHover: {
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: "black",
        fontWeight: "500",
      }
    },
  },
});
