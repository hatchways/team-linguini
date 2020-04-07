import React from './node_modules/react'

import { makeStyles } from "./node_modules/@material-ui/core/styles";
import AppBar from "./node_modules/@material-ui/core/AppBar";
import Toolbar from "./node_modules/@material-ui/core/Toolbar";
import Typography from "./node_modules/@material-ui/core/Typography";
import IconButton from "./node_modules/@material-ui/core/IconButton";
import DashboardRoundedIcon from './node_modules/@material-ui/icons/DashboardRounded';

const useStyles = makeStyles(theme => ({
    appBar: {
      background: '#5D5D5D',//"#FFFFFF",
      boxShadow: "none"
    },
    menuButton: {
        color: '#6D6D6D',
        marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  }));

const NavigationBar = () => {
    const classes = useStyles();
    return(
        <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My School Board
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <DashboardRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
}

export default NavigationBar