import React, { Fragment, useState } from 'react'
import { Draggable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import {Card, Button, Typography, CardContent} from "@material-ui/core";
import CardDetail from './CardDetail'

const useStyles = makeStyles(theme => ({
  card: {
    margin: "auto",
    width: "280px",
    marginBottom: "10px"
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 700,
    paddingLeft: 0
  },
  tag: {
    height: "7px",
    width: "45px",
    background: "#5ACD76",
    borderRadius: "5px",
    marginBottom: "10px"
  }
}));

const Task = ({ card, index }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    console.log('xyz');
  }

  return (
    <Fragment>
      <Draggable draggableId={card.id} index={index}
        // shouldRespectForcePress={true}
      >
        {provided => (
          <Card
            className={classes.card}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardContent>
              <div className={classes.tag} />
              <Button className={classes.cardTitle} onClick={handleClickOpen}>
                {card.title}
              </Button>
              <Typography color="textSecondary">{card.deadline}</Typography>
            </CardContent>
          </Card>
        )}
      </Draggable>

      <CardDetail open={open} handleClose={handleClose}></CardDetail>
    </Fragment>
  );
};

export default Task;
