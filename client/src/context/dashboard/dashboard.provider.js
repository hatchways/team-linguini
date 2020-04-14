import React, {createContext, useContext, useEffect, useState} from "react";
import {authFetch} from "../../helpers/authFetch";

const DashboardContext = createContext();

const useDashboard = () => useContext(DashboardContext);

const DashboardProvider = (props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] =useState({});
    const [columns, setColumns] =useState({});
    const [cards, setCards] =useState({});

    useEffect(() => {
        setIsFetching(true);

        authFetch('/api/v1/boards/init')
            .then(res => res.json())
            .then(res => {
                setIsFetching(false);
                if (!res.error){
                    setCards(res.cards);
                    setColumns(res.columns);
                    setBoards(res.boards);
                    setSelectedBoard(res.selectedBoard);
                } else {
                    throw Error(res.error)
                }
            })
            .catch(e => {
                setError(e.message);
            })
    })

    const defaultValue = {
        isFetching, setIsFetching,
        error, setError,
        boards, setBoards,
        selectedBoard, setSelectedBoard,
        columns, setColumns,
        cards, setCards
    }

    return (
        <DashboardContext.Provider value={defaultValue} {...props}/>
    )
}

export {DashboardProvider, useDashboard};

