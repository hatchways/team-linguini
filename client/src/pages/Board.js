import React, { useState, useEffect, useContext } from "react";
import initialData from "../context/InitialData";
import NavigationBar from "../components/NavigationBar";
import BoardBar from "../components/BoardBar";
import Column from "../components/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Button, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { DashboardContext } from "../context/dashboard/dashboard.provider";
import { authFetch } from "../helpers/authFetch";
import CreateModelByName from "../components/CreateModelByName";

const useStyles = makeStyles((theme) => ({
  horizontalCollection: {
    marginTop: "40px",
    display: "flex",
    justifycontent: "flex-start",
    flexwrap: "nowrap",
  },
  addColumn: {
    height: 550,
    //marginRight: 40,
    //boxShadow: "none",
    //position: "fixed",
    //boder: 20,
  },
  grid: {
    marginLeft: "60px",
    display: "flex",
  },
  container: {
    width: "100%",
    maxWidth: "1370px",
    overflowX: "scroll",
    overflow: "hidden",
    margin: "0 auto",
    paddingBottom: "17px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const Board = () => {
  const classes = useStyles();
  // const [data, setData] = useState(initialData);

  const [switchBoard, setSwitchBoard] = useState(false);
  const [openCreationBoardDialog, setCreationBoardDialog] = useState(false);

  //Access the states from Dashboard Provider
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
  } = useContext(DashboardContext);

  if (error !== null || isFetching || boards.length === 0) {
    return <BoardBar />;
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(selectedBoard.columns);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setSelectedBoard({
        ...selectedBoard,
        columns: newColumnOrder,
      });
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    //Moving withing the same column
    if (start === finish) {
      const newCardIds = Array.from(start.cards);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        cards: newCardIds,
      };

      setColumns({
        ...columns,
        [newColumn._id]: newColumn,
      });
      return;
    }
    //Moving from one column to another
    const startCardIds = Array.from(start.cards);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cards: startCardIds,
    };

    const finishCardIds = Array.from(finish.cards);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cards: finishCardIds,
    };

    setColumns({
      ...columns,
      [newStart._id]: newStart,
      [newFinish._id]: newFinish,
    });
  };

  const handleOpenCreationBoardDialog = () => {
    setCreationBoardDialog(true);
  };

  const handleCloseCreationBoardDialog = () => {
    setCreationBoardDialog(false);
  };

  const saveCreateBoardDialog = (data) => {
    const formData = new FormData();
    formData.append("title", data.board);
    formData.append("boardId", selectedBoard._id);
    const url = "/api/v1/columns";
    const updatedColumns = { ...columns };
    authFetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("newcolumns", data);
        updatedColumns[data._id] = data;
        console.log("column before upate", updatedColumns);
        setColumns(updatedColumns);
        const newColumn = Object.keys(updatedColumns); //Array.from(columns._id);
        console.log("column before", newColumn);
        //newColumn.push(data._id);
        console.log("columns after", newColumn);
        //columns.push(data._id);
        setSelectedBoard({
          ...selectedBoard,
          columns: newColumn,
        });
      });
  };
  return (
    <div>
      <NavigationBar />
      <BoardBar />
      <div className={classes.horizontalCollection}>
        <Box>
          <Button
            variant="contained"
            className={classes.addColumn}
            onClick={handleOpenCreationBoardDialog}
            position="fixed"
          >
            <AddCircleOutlineIcon className={classes.createButtonIcon} />
          </Button>
          <CreateModelByName
            title="Create a new board"
            description="Add Title"
            onCloseModal={handleCloseCreationBoardDialog}
            openModal={openCreationBoardDialog}
            name="board"
            saveValue={(event) => saveCreateBoardDialog(event)}
          />
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className={classes.container}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className={classes.grid}>
                  {selectedBoard.columns.map((columnId, index) => {
                    const column = columns[columnId];
                    console.log("columns.lcards", column.cards);
                    const cardsArr = column.cards.map(
                      (cardId) => cards[cardId]
                    );

                    return (
                      <Column
                        key={column._id}
                        column={column}
                        cards={cardsArr}
                        index={index}
                      />
                    );
                  })}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
