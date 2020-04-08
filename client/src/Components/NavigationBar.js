import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    iconButtonLabel: {
     display: 'flex',
    },
    appBar: {
      background: "#FFFFFF",
      boxShadow: "none",
      display: 'flex',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    toolBar: {
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 2,
    },
    createAndProfileBar: {
      justifyContent: 'space-between',
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
        <Toolbar className = {classes.createAndProfileBar}>
          <Button variant="contained" color="blue">
            <AddIcon/> Create board
          </Button>
          <IconButton>
            <AccountCircleIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
}

export default NavigationBar