import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../context/dashboard/dashboard.provider";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@material-ui/core";
import "./Calendar.css";
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  container: {
    height: "600px",
    marginTop: "20px",
    marginLeft: "70px",
    marginRight: "70px",
    paddingBottom: "80px",
  },
  calendar: {
    background: "blue",
  },
}));

const Calendar = () => {
  const classes = useStyles();
  const {
    isFetching,
    setIsFetching,
    error,
    setError,
    boards,
    setBoards,
    selectedBoard,
    setSelectedBoard,
    columns,
    setColumns,
    cards,
    setCards,
  } = useContext(DashboardContext);
  
  const [cardData, setCardData] = useState([])
  console.log(cardData)

  //console.log(columns)
  //console.log(Object.entries(columns))
  //console.log(cards)
  //console.log(Object.entries(cards))

  useEffect(() => {
    Object.entries(cards).map(card => {
    //const title = card[1].title
    const date = moment(card[1].deadline).format("YYYY-MM-DD")
    //console.log(date)
    setCardData(prevState => [...prevState, {...card[1], date}])
    return null
  })

  //console.log(cardData)
  }, [cards])

  /*
  [
            { title: "event 1", date: "2020-04-24" },
            { title: "event 2", date: "2020-04-27" },
            { title: "event 3", date: "2020-04-27" },
            { title: "event 4", date: "2020-04-27" },
            { title: "event 5", date: "2020-04-27" },
            { title: "event 6", date: "2020-04-27" },
          ]
  */

  return (
    <div>
      <Box className={classes.container}>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          contentHeight={500}
          header={{
            left: "",
            center: "title",
            right: "today prevYear, prev, next, nextYear",
          }}
          events={cardData}
          eventLimit={true}
          eventBackgroundColor="white"
          eventTextColor="black"
          eventBorderColor="white"
          fixedWeekCount={false}
          editable={true}
          eventDrop={(info) => console.log(info)}
        />
      </Box>
    </div>
  );
};

export default Calendar;
