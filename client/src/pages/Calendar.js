import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../context/dashboard/dashboard.provider";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@material-ui/core";
import "./Calendar.css";
import moment from "moment";
import { authJSONFetch } from "../helpers/authFetch";
import CardDetail from "../components/CardDetail";

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
  const { cards, setCards } = useContext(DashboardContext);

  const [cardData, setCardData] = useState([]);
  const [card, setCard] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newCardData = [];
    Object.entries(cards).map((card) => {
      const date = moment(card[1].deadline).format("YYYY-MM-DD");
      newCardData.push({ ...card[1], date });
      return null;
    });
    setCardData(newCardData);
  }, [cards]);

  const eventDrop = (info) => {
    const cardId = info.event.extendedProps._id;
    const deadline = moment(info.event._instance.range.end).format(
      "YYYY-MM-DD"
    );

    authJSONFetch(`/api/v1/cards/${cardId}`, {
      method: "PUT",
      body: JSON.stringify({ deadline }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          const newCards = { ...cards, [res._id]: res };
          setCards(newCards);
        }
      });
  };

  const eventClick = (info) => {
    const search = cardData.filter(
      (card) => card._id === info.event.extendedProps._id
    );
    setCard(...search);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CardBox = (props) => {
    if (props.card === null) {
      return null;
    } else {
      return (
        <CardDetail
          open={props.open}
          handleClose={props.handleClose}
          card={props.card}
        />
      );
    }
  };

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
          eventDrop={(info) => eventDrop(info)}
          eventClick={(info) => eventClick(info)}
        />
      </Box>
      <CardBox open={open} handleClose={handleClose} card={card} />
    </div>
  );
};

export default Calendar;
