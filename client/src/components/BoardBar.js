import React, { useState, useContext } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { authFetch } from "../helpers/authFetch";
import { DashboardContext } from "../context/dashboard/dashboard.provider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "45px",
    flexDirection: "row",
    alignItems: "center",
    background: "#759CFC",
    color: "white",
    boxShadow: "none",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    alignItems: "center",
    flexGrow: 2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    fontSize: "1.1rem"
  },
  root: {
    display: "flex",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const BoardBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { boards, selectedBoard } = useContext(DashboardContext);
  const selectBoard = (id) => {
    const idOfNewlySelectedBoard = new FormData();
    idOfNewlySelectedBoard.append("selectedBoard", id);
    const urlUpdatingUserSelectedBoard = "/api/v1/user/update";
    authFetch(urlUpdatingUserSelectedBoard, {
      method: "PUT",
      body: idOfNewlySelectedBoard,
    })
      .then((res) => res.json())
      .then((dataOfUserUpdateSelectedBoard) => {
        window.location.replace("/");
      });
  };
  const handleDrawerOpen = () => {
    const url = "/api/v1/boards/";

    authFetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const titles = {};
        for (let i = 0; i < data.boards.length; i += 1) {
          titles[data.boards[i]._id] = data.boards[i].title;
        }
        setOpen(true);
      });
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            {selectedBoard.title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        //variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {boards.map((board) => (
            <ListItem
              button
              key={board.title.toString()}
              idvalue={board._id}
              onClick={selectBoard.bind(this, board._id)}
            >
              <ListItemText primary={board.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              window.location.replace("/logout");
            }}
          >
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default BoardBar;
