import React from "react";
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styling/KitchenOrders.css";
import axios from 'axios';


// This page will only be visible to waiter and kitchen staff - not to the customer

function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});

    const getOrder = async () => {
        const response = await axios.get('http://127.0.0.1:8000/orders/api')
        setOrders(response.data)
    }

    useEffect(() => {
        getOrder();
    }, [])

    const handleOrderSelect = (selectedOrder) => {
        setSelectedRow(prevState => ({
            ...prevState,
            [selectedOrder.id]: !prevState[selectedOrder.id],
        }));
    };

    const handleCancelClick = async () => {
        // get access token from local storage
        const access_token = localStorage.getItem('access_token');

        //if access token is null or empty, user is not authenticated
        if (!access_token) {
            console.log('User not authenticated');
            return;
        }

        // delete selected orders
        const deleteOrders = [];

        
        Object.keys(selectedRow).forEach((id) => {
            if (selectedRow[id]) {
                deleteOrders.push(id);
            }
        });

        if (deleteOrders.length > 0) {
            try {
                await Promise.all(deleteOrders.map(order => {
                    return axios ({
                        method: 'DELETE',
                        url: `http://127.0.0.1:8000/orders/api/${order}`,
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    });
                }));
                
                // update state to remove deleted orders
                const newOrder = orders.filter((d) => !deleteOrders.includes(d.id));
                setOrders(newOrder);

            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <>
            <div class="order_torso">
                <Table class="order_Table">
                    <thead>
                        <tr>
                            <th class="order_th">Order Time</th>
                            <th class="order_th">Order ID</th>
                            <th class="order_th">Table Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr>
                                <td class="order_td">{order.orderTime.substring(0, 8)}</td>
                                <td class="order_td">{order.id}</td>
                                <td class="order_td">{order.tableNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Orders;