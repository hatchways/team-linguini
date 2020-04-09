import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    appBar: {
      background: "#FFFFFF",
      boxShadow: "none",
      display: 'flex',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    toolBar: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexGrow: 2,
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
        <Toolbar className = {classes.toolBar}>
          <Box display="flex">
            <Typography variant="title">
              <img src="/images/logo.png" alt="bug"  />
            </Typography>  
          </Box>
          <Box display="flex">
            <Button>
              <DashboardRoundedIcon/> Dashboard 
              </Button>
            <Button>
              <CalendarTodayOutlinedIcon/> Calendar
            </Button>
          </Box>
          <Box display="flex">
            <Button variant="contained" color="blue">
              <AddIcon/> Create board
            </Button>
            <IconButton>
              <AccountCircleIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    )
}

export default NavigationBar