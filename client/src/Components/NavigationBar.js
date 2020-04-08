import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  iconButtonLabel: {
    display: 'flex',
  },
    appBar: {
      background: "#FFFFFF",
      boxShadow: "none",
      display: 'flex',
      flexDirection: "row",
    },
    toolBar: {
      //display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerDiv: {
      alignItems: 'center',
    },
    menuButton: {
        color: 'black',
    },
    button: {
      margin: theme.spacing(1),
    },
    title: {
      color: 'black',
    }
  }));

const NavigationBar = () => {
    const classes = useStyles();
    return(
        <AppBar position="static" className={classes.appBar}>
          <Typography variant="title">
            <img src="/images/logo.png" alt="bug"  />
          </Typography>
          <Toolbar className = {classes.toolBar}>
            <Button>
              <DashboardRoundedIcon/> Dashboard 
            </Button>
            <Button>
              <CalendarTodayOutlinedIcon/> Calendar
            </Button>

        </Toolbar>
      </AppBar>
    )
}

export default NavigationBar