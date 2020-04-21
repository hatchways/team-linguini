import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Container, Box, Grid } from "@material-ui/core";

import BoardBar from "../components/BoardBar";
import NavigationBar from "../components/NavigationBar";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "550px",
    marginTop: "20px",
    marginBottom: "20px",
  },
}));

const Calendar = () => {
  const classes = useStyles();
  return (
    <div>
      <NavigationBar />
      <BoardBar />
      <Container className={classes.container}>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          contentHeight={500}
          header={{
            left: "",
            center: "title",
            right: "prevYear, prev, next, nextYear",
          }}
        />
      </Container>
    </div>
  );
};

export default Calendar;
