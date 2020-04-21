import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Container, Box, Grid } from "@material-ui/core";
import "./Calendar.css"

import BoardBar from "../components/BoardBar";
import NavigationBar from "../components/NavigationBar";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "600px",
    marginTop: "20px",
    marginLeft: "70px",
    marginRight: "70px",
    paddingBottom: "80px"
  },
  calendar: {
      background: "blue"
  }
}));

const Calendar = () => {
  const classes = useStyles();
  return (
    <div>
      <NavigationBar />
      <BoardBar />
      <Box className={classes.container}>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          contentHeight={500}
          header={{
            left: "",
            center: "title",
            right: "today prevYear, prev, next, nextYear",
          }}
          events={[
            { title: 'event 1', date: '2020-04-24' },
            { title: 'event 2', date: '2020-04-27' },
            { title: 'event 3', date: '2020-04-27' },
            { title: 'event 4', date: '2020-04-27' },
            { title: 'event 5', date: '2020-04-27' },
            { title: 'event 6', date: '2020-04-27' },
          ]}
          eventLimit={true}
          eventBackgroundColor='white'
          eventTextColor='black'
          eventBorderColor='white'
          fixedWeekCount={false}
        />
      </Box>
    </div>
  );
};

export default Calendar;
