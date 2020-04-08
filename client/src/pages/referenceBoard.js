import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

//This component is just for reference, it has been split into individual components and can be deprecated later

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: "#759CFC",
    boxShadow: "none"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  paper: {
    height: 550,
    width: 320,
    background: "#F4F6FF",
    boxShadow: "none",
    position: "relative",
    marginRight: "20px"
  },
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
  },
  column: {
    marginLeft: "25px",
    paddingTop: "20px"
  },
  holder: {
    fontSize: "24px",
    color: "#D7DDF8"
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
  card: {
    margin: "auto",
    width: "280px",
    marginBottom: "10px"
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 700
  },
  tag: {
    height: "7px",
    width: "45px",
    background: "#5ACD76",
    borderRadius: "5px",
    marginBottom: "10px"
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

//Cards Data Structure
const cardsData = [
  {
    id: "10",
    title: "Study Math",
    deadline: "07/04/2020",
    tag: "green",
    description: "lorem ipsum"
  },
  {
    id: "20",
    title: "Go to School",
    deadline: "07/04/2020",
    tag: "green",
    description: "lorem ipsum"
  },
  {
    id: "30",
    title: "Do your Homework",
    deadline: "07/04/2020",
    tag: "green",
    description: "lorem ipsum"
  },
  {
    id: "40",
    title: "Eat your veggies",
    deadline: "07/04/2020",
    tag: "green",
    description: "lorem ipsum"
  }
];

//Column Data Structure
const columnsData = {
  1: {
    id: "1",
    title: "Backlog",
    cards: cardsData,
    columnOrder: 1
  },
  2: {
    id: "2",
    title: "In Progress",
    cards: [],
    columnOrder: 2
  },
  3: {
    id: "3",
    title: "Review",
    cards: [],
    columnOrder: 3
  },
  4: {
    id: "4",
    title: "Completed",
    cards: [],
    columnOrder: 4
  }
};

const Board = () => {
  const classes = useStyles();
  const [columns, setColumns] = useState(columnsData);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if(type === 'column'){
        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];
        
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn
            },
            [destination.droppableId]: {
                ...destinationColumn
            }
        })
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      const sourceCards = [...sourceColumn.cards];
      const destinationCards = [...destinationColumn.cards];
      const [removed] = sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          cards: sourceCards
        },
        [destination.droppableId]: {
          ...destinationColumn,
          cards: destinationCards
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedCards = [...column.cards];
      const [removed] = copiedCards.splice(source.index, 1);
      copiedCards.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          cards: copiedCards
        }
      });
    }
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My School Board
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                  <div className={classes.container} {...provided.droppableProps} ref={provided.innerRef}>
                  <div className={classes.grid}>
                    {Object.entries(columns).map(([id, column]) => (
                        <Draggable draggableId={column.id} index={column.columnOrder} key={id}>
                            {(provided) => (
                      <Grid key={id} item ref={provided.innerRef}
                      {...provided.draggableProps}>
                      <Paper className={classes.paper}>
                        <div className={classes.columnTitle} 
                      {...provided.dragHandleProps}>
                          <Typography variant="h6" className={classes.column}>
                            {column.title}
                          </Typography>
                          <div className={classes.icon}>
                            <i
                              className="fas fa-ellipsis-h"
                              style={{ color: "#D7DDF8" }}
                            ></i>
                          </div>
                        </div>
      
                        <Droppable droppableId={id} key={id} type="card">
                          {(provided, snapshot) => {
                            return (
                              <div
                                className={classes.cardSection}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {column.cards.map((card, index) => {
                                  return (
                                    <Draggable
                                      key={card.id}
                                      draggableId={card.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              userSelect: "none",
                                              ...provided.draggableProps.style
                                            }}
                                          >
                                            <Card className={classes.card}>
                                              <CardContent>
                                                <div className={classes.tag} />
                                                <Typography
                                                  className={classes.cardTitle}
                                                  gutterBottom
                                                >
                                                  {card.title}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                  {card.deadline}
                                                </Typography>
                                              </CardContent>
                                            </Card>
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
      
                        <Button variant="contained" className={classes.addCard}>
                          Add Card
                        </Button>
                      </Paper>
                    </Grid>
                            )}
                        </Draggable>
                    ))}
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
