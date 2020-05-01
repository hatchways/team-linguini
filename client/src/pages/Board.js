import React, { useState, useContext } from "react";

import Column from "../components/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { DashboardContext } from "../context/dashboard/dashboard.provider";
import { authFetch, authJSONFetch } from '../helpers/authFetch'
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

  const [openCreationCardDialog, setCreationBoardDialog] = useState(false);

  //Access the states from Dashboard Provider
  const {
    isFetching,
    error,
    boards,
    selectedBoard,
    setSelectedBoard,
    columns,
    setColumns,
    cards,
  } = useContext(DashboardContext);

  if (error!== null || isFetching || boards.length ===0) {
    return null
  }

  const onDragEnd = result => {
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

      const url = "/api/v1/boards/" + selectedBoard._id;
      authJSONFetch(url, {
        method: "PUT",
        body: JSON.stringify({ columns: newColumnOrder }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // throw new Error(data.error);
            console.log("update columns order", data.error);
            return;
          }
          return;
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

      const url = "/api/v1/columns/" + newColumn._id;
      authJSONFetch(url, { method: 'PUT', body: JSON.stringify({ cards: newCardIds }) })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
            console.log('update cards order', data.error)
            return;
          }
          return;
        })

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

    let newUrl = '/api/v1/columns/' + newStart._id;
    authJSONFetch(newUrl, {method: 'PUT', body: JSON.stringify({cards: newStart.cards})})
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // throw new Error(data.error);
          console.log("update cards order", data.error);
          return;
        }
        return;
      });

    newUrl = '/api/v1/columns/' + newFinish._id;
    authJSONFetch(newUrl, {method: 'PUT', body: JSON.stringify({cards: newFinish.cards})})
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // throw new Error(data.error);
          console.log("update cards order", data.error);
          return;
        }
        return;
      });

    newUrl = '/api/v1/cards/' + finishCardIds[destination.index].toString();
    authJSONFetch(newUrl, {method: 'PUT', body: JSON.stringify({columnId: newFinish._id})})
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // throw new Error(data.error);
          console.log("update columnId of the card", data.error);
          return;
        }
        return;
      });
  };

  const handleOpenCreationBoardDialog = () => {
    setCreationBoardDialog(true);
  };

  const handleCloseCreationColumnDialog = () => {
    setCreationBoardDialog(false);
  };

  const saveCreateColumn = (data) => {
    if (!data.column || data.column === ''){
      return;
    }
    const formData = new FormData();
    formData.append("title", data.column);
    formData.append("boardId", selectedBoard._id);
    const url = "/api/v1/columns";
    const updatedColumns = { ...columns };
    authFetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        updatedColumns[data._id] = data;
        setColumns(updatedColumns);
        const newColumn = Object.keys(updatedColumns);
        setSelectedBoard({
          ...selectedBoard,
          columns: newColumn,
        });
      
      handleCloseCreationColumnDialog();
      });
  };
  return (
    <div>
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
            title="Create a new column"
            description="Add Title"
            onCloseModal={handleCloseCreationColumnDialog}
            openModal={openCreationCardDialog}
            name="column"
            buttonName="Create Column"
            saveValue={(event) => saveCreateColumn(event)}
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
