import axios from "axios";
import React, { useEffect } from "react";

export const App = () => {
    useEffect(() => {
        const fetchAx = async () => {
            const data = await axios.get('/api/users');
            console.log(data);
        }
        fetchAx();
    }, [])
    return <h1>Hello</h1>
}
