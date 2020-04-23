import React, { Fragment, useState } from 'react'
import { Draggable } from "react-beautiful-dnd";

import { makeStyles} from "@material-ui/core/styles";
import {Card, Box, Button, Typography, CardContent} from "@material-ui/core";
import CardDetail from './CardDetail'

const useStyles = makeStyles(theme => ({
  card: {
    margin: "auto",
    width: "280px",
    marginBottom: "10px",
    borderRadius: '8px'
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 700,
    "&:hover": {
      cursor: 'pointer'
    },
    // paddingLeft: 0
  },
  tag: {
    height: "7px",
    width: "45px",
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


  return (
    <Fragment>
    <Draggable draggableId={card._id} index={index}>
      {provided => (
        <Card
          className={classes.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent >
            <Box className={classes.tag} bgcolor={"cardColor." + card.colorCode}/>
            <Typography className={classes.cardTitle} onClick={handleClickOpen}>
              {card.title}
            </Typography>
            <Typography color="textSecondary">{card.deadline}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
    <CardDetail open={open} handleClose={handleClose} card={card}></CardDetail>
</Fragment>
  );
};

export default Task;
