import React, {useState, useEffect, useContext} from "react";
import initialData from "../context/InitialData";
import NavigationBar from "../components/NavigationBar";
import BoardBar from "../components/BoardBar";
import Column from "../components/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import {DashboardContext} from "../context/dashboard/dashboard.provider";
import {authFetch} from "../helpers/authFetch";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "40px",
    marginLeft: "20px",
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

  //Access the states from Dashboard Provider
  const {
    isFetching, setIsFetching,
    error, setError,
    boards, setBoards,
    selectedBoard, setSelectedBoard,
    columns, setColumns,
    cards, setCards
  } = useContext(DashboardContext);



  if (error!== null || isFetching || boards.length ===0) {
    return (
        <BoardBar/>
    )
  }

  console.log(boards);
  console.log('selectedBoard', selectedBoard);
  console.log('columns', columns);
  console.log(cards);

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
        columns: newColumnOrder
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
        cards: newCardIds
      };

      setColumns({
        ...columns,
        [newColumn._id]: newColumn
      });
      return;
    }
    //Moving from one column to another
    const startCardIds = Array.from(start.cards);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cards: startCardIds
    };

    const finishCardIds = Array.from(finish.cards);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cards: finishCardIds
    };

    setColumns({
      ...columns,
      [newStart._id]: newStart,
      [newFinish._id]: newFinish
    });
  };

  return (
    <div>
      <NavigationBar />
      <BoardBar />
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
                    cardId => cards[cardId]
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
  );
};

export default Board;
