import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchData, getAllData } from './slices/usersDataSlice';
import { TableWithUsersData } from "./TableWithUsersData";

export const App = () => {
    const dispatch = useDispatch();
    const allData = useSelector(getAllData);
    useEffect(() => {
        dispatch(fetchData());
    }, []);
    return (
        allData.length === 0 ? <div> Идет загрузка данных </div> : <TableWithUsersData allData={allData}/>
    )
}
