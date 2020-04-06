import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
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
  }
}));

const Task = ({ card }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.tag} />
        <Typography className={classes.cardTitle} gutterBottom>
          {card.title}
        </Typography>
        <Typography color="textSecondary">{card.deadline}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
