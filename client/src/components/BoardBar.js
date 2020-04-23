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
    background: "#759CFC",
    boxShadow: "none",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
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
  const [boardTitles, setBoardTitles] = useState({});
  const {
    isFetching,
    setIsFetching,
    error,
    setError,
    boards,
    setBoards,
    selectedBoard,
    setSelectedBoard,
    columns,
    setColumns,
    cards,
    setCards,
    setAvatarUrl,
  } = useContext(DashboardContext);
  const selectBoard = (id) => {
    //event.target.key;
    //console.log("the key", event.target.getAttribute("key"));
    //const selectedIndex = event.target.options.selectedIndex;
    //console.log(event.target.options[selectedIndex].getAttribute("idValue"));
    console.log(id);
    const idOfNewlySelectedBoard = new FormData();
    idOfNewlySelectedBoard.append("selectedBoard", id);
    const urlUpdatingUserSelectedBoard = "/api/v1/user/update";
    authFetch(urlUpdatingUserSelectedBoard, {
      method: "PUT",
      body: idOfNewlySelectedBoard,
    })
      .then((res) => res.json())
      .then((dataOfUserUpdateSelectedBoard) => {
        console.log("updatedUserSelectedBoard", dataOfUserUpdateSelectedBoard);
        const url = "/api/v1/boards/init";

        authFetch(url)
          .then((res) => res.json())
          .then((res) => {
            setIsFetching(false);
            if (!res.error) {
              console.log("board selected from list", res.selectedBoard);
              setError(null);
              setSelectedBoard(res.selectedBoard);
              setCards(res.cards);
              setColumns(res.columns);
              setBoards(res.boards);
              //setAvatarUrl(res.avatarUrl);
              console.log("selectedBoard", selectedBoard);
            } else {
              throw Error(res.error);
            }
          });
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
          //titles.push(data.boards[i].title);
          titles[data.boards[i]._id] = data.boards[i].title;
        }
        setBoardTitles(titles);
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
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My School Board
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
          {Object.keys(boardTitles).map((id) => (
            <ListItem
              button
              key={id.toString()}
              idvalue={id}
              onClick={selectBoard.bind(this, id)}
            >
              <ListItemText primary={boardTitles[id]} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Settings", "Log Out"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default BoardBar;
