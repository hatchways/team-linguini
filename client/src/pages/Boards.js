import React, { useState } from "react";
import initialData from "./InitialData";
import BoardBar from "./BoardBar";
import Column from './Column'

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

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

  return (
    <div>
      <BoardBar />
      <div className={classes.container}>
        <div className={classes.grid}>
            {data.columnOrder.map(columnId => {
                const column = data.columns[columnId]
                const cards = column.cards.map(cardId => data.cards[cardId])

                return <Column key={column.id} column={column} cards={cards} />
            })}
        </div>
      </div>
    </div>
  );
};

export default Boards;
