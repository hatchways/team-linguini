import React, { useState } from "react";
import initialData from "./InitialData";
import BoardBar from "./BoardBar";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: "40px",
    marginLeft: "20px",
    display: "flex"
  },
  container: {
    width: "100%",
    maxWidth: "1370px",
    overflowX: "scroll",
    overflow: "hidden",
    margin: "0 auto",
    paddingBottom: "17px",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
}));

const Boards = () => {
  const classes = useStyles();
  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
      
  }

  return (
    <div>
      <BoardBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.container}>
          <div className={classes.grid}>
            {data.columnOrder.map(columnId => {
              const column = data.columns[columnId];
              const cards = column.cards.map(cardId => data.cards[cardId]);

              return <Column key={column.id} column={column} cards={cards} />;
            })}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Boards;
