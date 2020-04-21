import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import { DropzoneDialog } from "material-ui-dropzone";
import { authFetch } from "../helpers/authFetch";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#FFFFFF",
    boxShadow: "none",
    flexDirection: "row",
    alignItems: "center",
    height: "85px",
  },
  toolBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 2,
  },
  buttonNotSelected: {
    margin: theme.spacing(1),
    color: "#666666",
  },
  selectedButton: {
    margin: theme.spacing(1),
    color: "#759DFD",
  },
  title: {
    color: "black",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonIcons: {
    marginRight: "8px",
  },
  createButton: {
    backgroundColor: "#759DFD",
    marginRight: "40px",
    width: "175px",
    "&:hover": {
      backgroundColor: "#759DFD",
    },
  },
  createButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: "10px",
  },
  createButtonIcon: {
    color: "#FFFFFF",
  },
  userIcon: {
    width: "68px",
    height: "68px",
    flexShrink: 3,
  },
}));

const NavigationBar = () => {
  const initialStateDropFile = {
    open: false,
    files: [],
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState("Hello world");

  const handleClickAvatarMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatarMenu = () => {
    setAnchorEl(null);
  };

  const [stateDropFile, setStateDropFile] = useState(initialStateDropFile);

  const handleOpenDropFile = () => {
    setStateDropFile({
      ...stateDropFile,
      open: true,
    });
  };

  const handleCloseDropFile = () => {
    setStateDropFile({
      ...stateDropFile,
      open: false,
    });

    handleCloseAvatarMenu();
  };

  const handleSaveDropFile = (files) => {
    console.log(files);
    setStateDropFile({
      ...stateDropFile,
      files: files,
      open: false,
    });
    //data.preventDefault();
    //const file = data.target[0].files[0];
    const formData = new FormData();
    formData.append("avatar", files[0]);

    const url = "/api/v1/users/uploadAvatar";
    const token = JSON.parse(localStorage.getItem("token")) || null;
    authFetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //setData(JSON.stringify(data));
      });
  };

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Box>
          <Button>
            <Typography>
              <img src="/images/logo.png" alt="bug" />
            </Typography>
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.buttonNotSelected}
            component={NavLink}
            to="/"
            activeClassName={classes.selectedButton}
          >
            <DashboardRoundedIcon className={classes.buttonIcons} />
            <Typography className={classes.buttonText}>Dashboard</Typography>
          </Button>
          <Button
            className={classes.buttonNotSelected}
            component={NavLink}
            to="/calendar"
            activeClassName={classes.selectedButton}
          >
            <CalendarTodayOutlinedIcon className={classes.buttonIcons} />
            <Typography className={classes.buttonText}>Calendar</Typography>
          </Button>
        </Box>
        <Box>
          <Button variant="contained" className={classes.createButton}>
            <AddIcon className={classes.createButtonIcon} />
            <Typography className={classes.createButtonText}>
              Create board
            </Typography>
          </Button>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClickAvatarMenu}
          >
            <Avatar alt="Wonderful Client" src="/images/avatar.jpg" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseAvatarMenu}
          >
            <MenuItem onClick={handleOpenDropFile}>Change Photo</MenuItem>
          </Menu>
          <DropzoneDialog
            open={stateDropFile.open}
            onSave={handleSaveDropFile}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={handleCloseDropFile}
            submitButtonText={"Save"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
