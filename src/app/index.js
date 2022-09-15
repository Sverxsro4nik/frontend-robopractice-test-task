import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getAllData } from './slices/usersDataSlice';

export const App = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(getAllData);
    console.log(usersData);
    useEffect(() => {
        dispatch(fetchData());
    }, [])
    return <h1>Hello</h1>
}
