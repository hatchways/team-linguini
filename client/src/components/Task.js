import React, { Fragment, useState } from 'react'
import { Draggable } from "react-beautiful-dnd";
import moment from 'moment'

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
    paddingLeft: 0
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
            <Button className={classes.cardTitle} onClick={handleClickOpen} pl={0}>
              {card.title}
            </Button>
            <Typography color="textSecondary">{moment(card.deadline).format("YYYY-MM-DD")}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
    <CardDetail open={open} handleClose={handleClose} card={card}></CardDetail>
</Fragment>
  );
};

export default Task;
