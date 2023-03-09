import React from "react";
import "../styling/Orders.css";
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';


// This page will only be visible to waiter and kitchen staff - not to the customer

function Orders() {
    const [orders, setOrders] = useState([]);
    const [cancelOrder, setCancelOrder] = useState({});
    const [deliveredOrder, setDeliveredOrder] = useState({});
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/orders/api')
            .then(response => setOrders(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleCancelOrderSelect = (selectedOrder) => {
        setCancelOrder(prevState => ({
            ...prevState,
            [selectedOrder.id]: !prevState[selectedOrder.id],
        }));
    };

    const handleDeliveredOrderSelect = (selectedOrder) => {
        setDeliveredOrder(prevState => ({
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
        Object.keys(cancelOrder).forEach((id) => {
            if (cancelOrder[id]) {
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

    const handleDeliverClick = async () => {
        // get access token from local storage
        const access_token = localStorage.getItem('access_token');

        //if access token is null or empty, user is not authenticated
        if (!access_token) {
            console.log('User not authenticated');
            return;
        }

        // delete selected orders
        const deliveredOrders = [];
        Object.keys(deliveredOrder).forEach((id) => {
            if (deliveredOrder[id]) {
                deliveredOrders.push(id);
            }
        });

        if (deliveredOrders.length > 0) {
            try {
                await Promise.all(deliveredOrders.map(order => {
                    return axios ({
                        method: 'DELETE',
                        url: `http://127.0.0.1:8000/orders/api/${order}`,
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    });
                }));
                
                // update state to remove deleted orders
                const newOrder = orders.filter((d) => !deliveredOrders.includes(d.id));
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
                            <th>Order Time</th>
                            <th>Order ID</th>
                            <th>Table Number</th>
                            <th>Confirmed</th>
                            <th>Order Ready</th>
                            <th>Cancel Order</th>
                            <th>Order Delivered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} onClick={() => setSelectedRow(order.id)} className={"clickable-row".concat(selectedRow === order.id ? "selected" : "")}>
                                <td>{order.orderTime.substring(0, 8)}</td>
                                <td onClick={() => console.log('cell %{order.id} was clicked')}>{order.id}</td>
                                <td>{order.tableNumber}</td>
                                <td><input type="checkbox"></input></td>
                                <td><input type="checkbox"></input></td>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={cancelOrder[order.id] || false}
                                        onChange={() => handleCancelOrderSelect(order)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={deliveredOrder[order.id] || false}
                                        onChange={() => handleDeliveredOrderSelect(order)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button class="order_button" type="submit" onClick={handleCancelClick} >Cancel Order</button>
                <button class="order_button" type="submit" onClick={handleDeliverClick} >Mark Delivered</button>
            </div>
        </>
    );
}

export default Orders;