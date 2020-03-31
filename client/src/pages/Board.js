import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
        background: "#759CFC",
        boxShadow: "none",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      height: 500,
      width: 320,
      background: "#F4F6FF",
      boxShadow: "none",
    },
    grid: {
        marginTop: '40px',
    },
    column: {
        marginLeft: '25px',
        paddingTop: '20px',
    },
    holder: {
        fontSize: '24px',
        color: '#D7DDF8'
    },
    columnTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginLeft: '150px',
        marginTop: '20px',
        padding: '20px',
        cursor: 'pointer',
    }
  }));

const Board = () => {
    const classes = useStyles()

  return (
    <div>
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
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

        <Grid container justify="center" spacing={2} xs={true} className={classes.grid}>
          {[0, 1, 2, 3].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper}>
                <div className={classes.columnTitle}>
                    <Typography variant="h6" className={classes.column}>
                    In Progress
                    </Typography>
                    <div className={classes.icon}>
                    <i className="fas fa-ellipsis-h" style={{color: '#D7DDF8'}}></i>
                    </div>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>

    </div>
  );
};

export default Board;
