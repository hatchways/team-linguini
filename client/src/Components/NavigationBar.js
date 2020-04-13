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
      flexDirection: "row",
      alignItems: 'center',
      height: '85px',
    },
    toolBar: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexGrow: 2,
    },
    button: {
      margin: theme.spacing(1),
      color: '#666666',
    },
    title: {
      color: 'black',
    }, 
    buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    buttonIcons: {
      marginRight:'8px'
    }, 
    createBox: {
      alignItems: 'center',
      height: '100px',
    },
    createButton: {
      backgroundColor: "#759DFD",
      marginRight: '40px',
      width: '175px',
    },
    createButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      padding: '10px',
    },
    createButtonIcon: {
      color: '#FFFFFF'
    },
    userIcon: {
      width: '68px',
      height: '68px',
      flexShrink: 3,
    }
  }));

const NavigationBar = () => {
    const classes = useStyles();
    return(
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className = {classes.toolBar}>
          <Box >
            <Typography variant="title">
              <img src="/images/logo.png" alt="bug"  />
            </Typography>  
          </Box>
          <Box >
            <Button className = {classes.button}>
              <DashboardRoundedIcon className = {classes.buttonIcons}/> 
              <Typography className = {classes.buttonText}>
                Dashboard 
              </Typography>
              </Button>
            <Button className = {classes.button}>
              <CalendarTodayOutlinedIcon className = {classes.buttonIcons}/> 
              <Typography className = {classes.buttonText}>
                Calender 
              </Typography>
            </Button>
          </Box>
          <Box className className = {classes.createBox}>
            <Button variant="contained" className = {classes.createButton}>
              <AddIcon className = {classes.createButtonIcon}/> 
              <Typography className = {classes.createButtonText}>
              Create board
              </Typography>
            </Button>
            <IconButton>
              <AccountCircleIcon className = {classes.userIcon}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    )
}

export default NavigationBar