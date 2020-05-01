import React, { useState } from "react";
import Task from "./Task";
import CreateModelByName from "./CreateModelByName";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Input,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { authJSONFetch } from "../helpers/authFetch";
import { useDashboard } from "../context/dashboard/dashboard.provider";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      height: 550,
      width: 320,
      background: "#F4F6FF",
      boxShadow: "none",
      position: "relative",
      marginRight: "20px",
    },
    column: {
      marginLeft: "25px",
      paddingTop: "20px",
      width: "90%",
    },
    editColumnTitle: {
      marginLeft: "25px",
      paddingTop: "20px",
      //borderRadius: "5px",
      width: "90%",
      //background: "white",
    },
    columnTitle: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      marginTop: "20px",
      padding: "20px",
      cursor: "pointer",
    },
    cardSection: {
      height: 410,
      zIndex: 0,
      "&:before": {
        zIndex: 1,
        background:
          "linear-gradient(180deg, rgb(245, 246, 254) 0%, rgba(9,9,121,0) 31%)",
        top: "13%",
        content: '""',
        display: "block",
        height: "60px",
        left: "0",
        pointerEvents: "none",
        position: "absolute",
        width: "100%",
      },
      "&:after": {
        zIndex: 1,
        background:
          "linear-gradient(0deg, rgb(245, 246, 254) 0%, rgba(9,9,121,0) 31%)",
        bottom: "10%",
        content: '""',
        display: "block",
        height: "60px",
        left: "0",
        pointerEvents: "none",
        position: "absolute",
        width: "100%",
      },
      overflow: "auto",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    addCard: {
      // background: "#759CFC",
      color: "#759CFC",
      boxShadow: "none",
      position: "absolute",
      bottom: 10,
      left: 20,
      "&:hover": {
        background: "#759CFC",
        color: "#ffffff",
      },
    },
    addBoldCard: {
      background: "#759CFC",
      color: "#ffffff",
      boxShadow: "none",
      position: "absolute",
      bottom: 10,
      left: 20,
      "&:hover": {
        background: "#759CFC",
        color: "#ffffff",
      },
    },
    card: {
      margin: "auto",
      width: "280px",
      marginBottom: "10px",
      borderRadius: "8px",
      borderColor: "#759CFC",
      borderStyle: "solid",
      borderWidth: "1px",
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: 700,
      paddingLeft: 0,
    },
    tag: {
      height: "7px",
      width: "45px",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    colorCodeCircle: {
      width: 15,
      height: 15,
      margin: 4,
    },
    colorCodeBigCircle: {
      width: 15,
      height: 15,
      border: "solid 2px",
      margin: 4,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  };
});

const NewCardBox = (props) => {
  const classes = useStyles();

  const handleColorClick = (colorCode) => () => {
    props.setCardColorCode(colorCode);
  };

  const ColorCode = ({ colorCode }) => {
    if (props.cardColorCode === colorCode) {
      return (
        <Box
          component={"div"}
          className={classes.colorCodeBigCircle}
          borderRadius="50%"
          bgcolor={"cardColor." + colorCode}
          onClick={handleColorClick(colorCode)}
        />
      );
    } else {
      return (
        <Box
          component={"div"}
          className={classes.colorCodeCircle}
          borderRadius="50%"
          bgcolor={"cardColor." + colorCode}
          onClick={handleColorClick(colorCode)}
        />
      );
    }
  };

  return (
    <Box display={props.displayNewCard}>
      <Card className={classes.card}>
        <CardContent>
          <Input
            className={classes.cardTitle}
            placeholder={"Add title ..."}
            type={"text"}
            value={props.cardTitle}
            onChange={(event) => props.setCardTitle(event.target.value)}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
            mt={1}
          >
            <Typography component={"span"} color={"secondary"}>
              Select color:
            </Typography>
            <Box component={"div"} display="flex" flexDirection="row">
              <ColorCode colorCode={"green"} />
              <ColorCode colorCode={"red"} />
              <ColorCode colorCode={"yellow"} />
              <ColorCode colorCode={"blue"} />
              <ColorCode colorCode={"purple"} />
              <ColorCode colorCode={"white"} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const Column = ({ column, cards, index }) => {
  const classes = useStyles();
  const [displayNewCard, setDisplayNewCard] = useState("none");
  const [displayAddButton, setDisplayAddButton] = useState("block");
  const [cardTitle, setCardTitle] = useState("");
  const [cardColorCode, setCardColorCode] = useState("white");
  const [anchorEl, setAnchorEl] = useState(null);
  const [editColumnTitleDialog, setEditColumnTitleDialog] = useState(false);

  const dashboard = useDashboard();

  const handleAddCardClick = () => {
    setDisplayNewCard("block");
    setDisplayAddButton("none");
  };

  const handleSubmitAddingClick = () => {
    if (cardTitle) {
      const url = "/api/v1/cards";
      const bodyData = {
        title: cardTitle,
        colorCode: cardColorCode,
        columnId: column._id,
      };
      authJSONFetch(url, { method: "POST", body: JSON.stringify(bodyData) })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log(res.error);
            return;
          }

          dashboard.setCards({ ...dashboard.cards, [res._id]: res });
          const newColumns = { ...dashboard.columns };
          newColumns[res.columnId] = { ...dashboard.columns[res.columnId] };
          newColumns[res.columnId].cards.push(res._id);
          dashboard.setColumns(newColumns);

          setDisplayNewCard("none");
          setDisplayAddButton("block");
          setCardTitle("");
          setCardColorCode("white");
        });
    }
  };

  const handleDeleteColumn = (event) => {
    const url = `/api/v1/columns/${column._id}`;
    authJSONFetch(url, { method: "DELETE" })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          return;
        }

        // removes column from the selectedboard context
        const newSelectedColumns = dashboard.selectedBoard.columns;
        newSelectedColumns.splice(newSelectedColumns.indexOf(column._id), 1);
        dashboard.setSelectedBoard({
          ...dashboard.selectedBoard,
          columns: newSelectedColumns,
        });

        //removes cards from under the column
        dashboard.columns[column._id].cards.forEach(
          (cardId) => delete dashboard.cards[cardId]
        );

        // removes the column from the context
        const newColumns = { ...dashboard.columns };
        delete newColumns[column._id];
        dashboard.setColumns(newColumns);
      });
  };

  const handleEditColumnTitle = (updatedTitle) => {
    if (!updatedTitle.editColumnTitle || updatedTitle.editColumnTitle === ''){
      return;
    }
      const url = `/api/v1/columns/${column._id}`
      authJSONFetch(url, { method: "PUT", body: JSON.stringify({title: updatedTitle.editColumnTitle}) })
      .then(res => res.json())
      .then(res => {
        if(res.error){
          console.log(res.error)
          return
        }
        //updating the context state of column with updated title
        const newColumns = { ...dashboard.columns }
        newColumns[column._id].title = res.title
        dashboard.setColumns(newColumns)
        setAnchorEl(null)
        setEditColumnTitleDialog(false) 
      })
  }

  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <Grid
          key={column._id}
          item
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Paper className={classes.paper}>
            <div className={classes.columnTitle} {...provided.dragHandleProps}>
              <Typography variant="h6" className={classes.column}>
                {column.title}
              </Typography>
              <div
                className={classes.icon}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <i
                  className="fas fa-ellipsis-h"
                  style={{ color: "#D7DDF8" }}
                ></i>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setEditColumnTitleDialog(true)}>
                  Edit Column
                </MenuItem>
                <MenuItem onClick={handleDeleteColumn}>Delete Column</MenuItem>
              </Menu>
              <CreateModelByName
                title="Edit Column Title"
                description="Edit Title"
                defaultValue={column.title}
                onCloseModal={() => {
                  setAnchorEl(null);
                  setEditColumnTitleDialog(false);
                }}
                openModal={editColumnTitleDialog}
                name="editColumnTitle"
                buttonName="Update Title"
                saveValue={(event) => handleEditColumnTitle(event)}
              />
            </div>
            <Droppable droppableId={column._id} type="card">
              {(provided) => (
                <div
                  className={classes.cardSection}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cards.map((card, index) => (
                    <Task key={card._id} card={card} index={index} />
                  ))}
                  <NewCardBox
                    displayNewCard={displayNewCard}
                    setCardTitle={setCardTitle}
                    cardColorCode={cardColorCode}
                    setCardColorCode={setCardColorCode}
                    cardTitle={cardTitle}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Box display={displayNewCard}>
              <Button
                className={classes.addBoldCard}
                onClick={handleSubmitAddingClick}
              >
                Add a card
              </Button>
            </Box>
            <Box display={displayAddButton}>
              <Button className={classes.addCard} onClick={handleAddCardClick}>
                Add a card ...
              </Button>
            </Box>
          </Paper>
        </Grid>
      )}
    </Draggable>
  );
};

export default Column;
