import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styling/UpdateOrders.css";
import axios from 'axios';

function UpdateOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});

    const getOrder = async () => {
        const response = await axios.get('http://127.0.0.1:8000/orders/api')
        setOrders(response.data)
    }

    useEffect(() => {
        getOrder();
    }, [])

    const handleItemSelect = (selectedOrder) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [selectedOrder.id]: !prevState[selectedOrder.id],
        }));
    };
    
}

export default UpdateOrders;