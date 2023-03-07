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

    const handleConfirmSelect = (selectedOrder) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [selectedOrder.confirmed]: !prevState[selectedOrder.confirmed],
        }));
    };
    
    const handleReadySelect = (selectedOrder) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [selectedOrder.orderReady]: !prevState[selectedOrder.orderReady],
        }));
    };

    const handleCompleteSelect = (selectedOrder) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [selectedOrder.OrderComplete]: !prevState[selectedOrder.OrderComplete],
        }));
    };

    const handleUpdateClick = async () => {
        // Get the access_token from local storage
        const access_token = localStorage.getItem('access_token');

        // If access_token is null or empty, the user is not authenticated
        if (!access_token) {
            console.log('User not authenticated');
            return;
        }

        // Update the selected items
        const updateItems = [];

        Object.keys(selectedItems).forEach((confirmed) => {
            if (selectedItems[confirmed]) {
                updateItems.push(confirmed);
            }
        });

        Object.keys(selectedItems).forEach((orderReady) => {
            if (selectedItems[orderReady]) {
                updateItems.push(orderReady);
            }
        });
        
        Object.keys(selectedItems).forEach((OrderComplete) => {
            if (selectedItems[OrderComplete]) {
                updateItems.push(OrderComplete);
            }
        });

        if (updateItems.length > 0) {
            try {
                await Promise.all(updateItems.map(orders => {
                    return axios({
                        method: 'POST',
                        url: `http://127.0.0.1:8000/orders/api/${orders}`,
                        headers: {
                            'Authorization' : `Bearer ${access_token}`
                        },
                    });
                }));
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default UpdateOrders;