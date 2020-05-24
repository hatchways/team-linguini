import React, { useState, useContext } from "react";

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
import CreateModelByName from "./CreateModelByName";
import { authFetch } from "../helpers/authFetch";
import { DashboardContext } from "../context/dashboard/dashboard.provider";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#FFFFFF",
    boxShadow: "none",
    flexDirection: "row",
    alignItems: "center",
    height: "60px",
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
    "&:hover": {
      backgroundColor: "#f06292",
    },
  },
  createButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  createButtonIcon: {
    color: "#FFFFFF",
  },
  userIcon: {
    width: "68px",
    height: "68px",
    flexShrink: 3,
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const NavigationBar = () => {
  //Access the states from Dashboard Provider
  const {
    setIsFetching,
    setError,
    setBoards,
    selectedBoard,
    setSelectedBoard,
    setColumns,
    setCards,
    avatarUrl,
    setAvatarUrl,
  } = useContext(DashboardContext);
  const [openCreationBoardDialog, setCreationBoardDialog] = useState(false);

  const handleOpenCreationBoardDialog = () => {
    setCreationBoardDialog(true);
  };

  const handleCloseCreationBoardDialog = () => {
    setCreationBoardDialog(false);
  };

  const initialStateDropFile = {
    open: false,
    files: [],
  };

  const [anchorEl, setAnchorEl] = useState(null);

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
    console.log("saving file");
    console.log(files);
    setStateDropFile({
      ...stateDropFile,
      files: files,
      open: false,
    });

    const formData = new FormData();
    formData.append("avatar", files[0]);

    const url = process.env.URLSTART + "/api/v1/user/uploadAvatar";
    authFetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAvatarUrl(data.avatarUrl);
        console.log(avatarUrl);
        //setData(JSON.stringify(data));
      });
  };

  const saveCreateBoardDialog = (data) => {
    if (!data.board || data.board === "") {
      return;
    }
    const formData = new FormData();
    formData.append("title", data.board);
    const url = process.env.URLSTART + "/api/v1/boards/";
    //const newBoardData
    authFetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const idOfNewlySelectedBoard = new FormData();
        idOfNewlySelectedBoard.append("selectedBoard", data._id);
        const urlUpdatingUserSelectedBoard = "/api/v1/user/update";
        authFetch(urlUpdatingUserSelectedBoard, {
          method: "PUT",
          body: idOfNewlySelectedBoard,
        })
          .then((res) => res.json())
          .then((dataOfUserUpdateSelectedBoard) => {
            console.log(
              "updatedUserSelectedBoard",
              dataOfUserUpdateSelectedBoard
            );
            const urlInit = "/api/v1/boards/init";
            //useEffect(() => {
            setIsFetching(true);
            authFetch(urlInit)
              .then((res) => res.json())
              .then((res) => {
                setIsFetching(false);
                if (!res.error) {
                  console.log("response in create", res.selectedBoard);
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
            //});
            handleCloseCreationBoardDialog();
          });
      });
    console.log("data", data.board);
  };

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Box display={{ xs: "none", sm: "block" }}>
          <Button component={NavLink} to="/">
            <img src="/images/logo.png" alt="bug" />
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.buttonNotSelected}
            component={NavLink}
            to="/"
            exact={true}
            activeClassName={classes.selectedButton}
          >
            <DashboardRoundedIcon className={classes.buttonIcons} />
            <Box display={{ xs: "none", sm: "block" }}>
              <Typography className={classes.buttonText}>Dashboard</Typography>
            </Box>
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.buttonNotSelected}
            component={NavLink}
            to="/calendar"
            exact={true}
            activeClassName={classes.selectedButton}
          >
            <CalendarTodayOutlinedIcon className={classes.buttonIcons} />
            <Box display={{ xs: "none", sm: "block" }}>
              <Typography className={classes.buttonText}>Calendar</Typography>
            </Box>
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            className={classes.createButton}
            onClick={handleOpenCreationBoardDialog}
          >
            <AddIcon className={classes.createButtonIcon} />
            <Box display={{ xs: "none", sm: "block" }}>
              <Typography className={classes.createButtonText}>
                Create board
              </Typography>
            </Box>
          </Button>
        </Box>
        <Box>
          <CreateModelByName
            title="Create a new board"
            description="Add Title"
            onCloseModal={handleCloseCreationBoardDialog}
            openModal={openCreationBoardDialog}
            name="board"
            buttonName="Create Board"
            saveValue={(event) => saveCreateBoardDialog(event)}
          />
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClickAvatarMenu}
          >
            <Avatar
              alt="/images/avatar.jpg"
              src={avatarUrl}
              className={classes.avatar}
            />
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
