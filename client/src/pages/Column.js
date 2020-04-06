import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  paper: {
    height: 550,
    width: 320,
    background: "#F4F6FF",
    boxShadow: "none",
    position: "relative",
    marginRight: "20px"
  },
  column: {
    marginLeft: "25px",
    paddingTop: "20px"
  },
  columnTitle: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginLeft: "150px",
    marginTop: "20px",
    padding: "20px",
    cursor: "pointer"
  },
  cardSection: {
    height: 410,
    overflow: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  addCard: {
    background: "#759CFC",
    color: "white",
    boxShadow: "none",
    position: "absolute",
    bottom: 20,
    left: 20,
    "&:hover": {
      background: "#759CFC"
    }
  }
}));

const Column = ({ column, cards }) => {
  const classes = useStyles();
  return (
    <Grid key={column.id} item>
      <Paper className={classes.paper}>
        <div className={classes.columnTitle}>
          <Typography variant="h6" className={classes.column}>
            {column.title}
          </Typography>
          <div className={classes.icon}>
            <i className="fas fa-ellipsis-h" style={{ color: "#D7DDF8" }}></i>
          </div>
        </div>
        <Droppable droppableId={column.id}>
          {provided => (
            <div className={classes.cardSection} {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Task key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Button variant="contained" className={classes.addCard}>
          Add Card
        </Button>
      </Paper>
    </Grid>
  );
};

export default Column;
