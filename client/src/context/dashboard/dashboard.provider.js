import React, { createContext, useContext, useEffect, useState } from "react";
import { authFetch } from "../../helpers/authFetch";

const DashboardContext = createContext();

const useDashboard = () => useContext(DashboardContext);

const DashboardProvider = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({});
  const [columns, setColumns] = useState({});
  const [cards, setCards] = useState({});
  const [avatarUrl, setAvatarUrl] = useState(null);

  //Initialize data from server
  const url = "/api/v1/boards/init";
  useEffect(() => {
    setIsFetching(true);
    authFetch(url)
      .then((res) => res.json())
      .then((res) => {
        setIsFetching(false);
        if (!res.error) {
          setError(null);
          setSelectedBoard(res.selectedBoard);
          setCards(res.cards);
          setColumns(res.columns);
          setBoards(res.boards);
          setAvatarUrl(res.avatarUrl);
        } else {
          throw Error(res.error);
        }
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  const defaultValue = {
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
  };

  return <DashboardContext.Provider value={defaultValue} {...props} />;
};

export { DashboardProvider, DashboardContext, useDashboard};
