import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
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
    };

    return (
        <>
            <div class="updateOrder_torso">
                <Table class="updateOrder_Table">
                    <thead>
                        <th class="updateOrder_th">Order ID</th>
                        <th class="updateOrder_th">Table Number</th>
                        <th class="updateOrder_th">Confirmed</th>
                        <th class="updateOrder_th">Update Confirmed?</th>
                        <th class="updateOrder_th">Order Ready</th>
                        <th class="updateOrder_th">Update Ready?</th>
                        <th class="updateOrder_th">Order Complete</th>
                        <th class="updateOrder_th">Update Complete?</th>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr>
                                <td class="updateOrder_td">{order.id}</td>
                                <td class="updateOrder_td">{order.tableNumber}</td>
                                {order.confirmed === true && <td class="updateOrder_td">Confirmed</td>}
                                {order.confirmed === false && <td class="updateOrder_td">Unconfirmed</td>}
                                <td class="updateOrder_td">
                                    <input 
                                        type = "checkbox"
                                        checked = {selectedItems[order.confirmed] || false}
                                        onChange = {() => handleConfirmSelect(order)}
                                    />
                                </td>
                                {order.orderReady === true && <td class="updateOrder_td">Ready</td>}
                                {order.orderReady === false && <td class="updateOrder_td">Not Ready</td>}
                                <td class="updateOrder_td">
                                    <input 
                                        type = "checkbox"
                                        checked = {selectedItems[order.orderReady] || false}
                                        onChange = {() => handleReadySelect(order)}
                                    />
                                </td>
                                {order.OrderComplete === true && <td class="updateOrder_td">Complete</td>}
                                {order.OrderComplete === false && <td class="updateOrder_td">Not Complete</td>}
                                <td class="updateOrder_td">
                                    <input
                                        type = "checkbox"
                                        checked = {selectedItems[order.OrderComplete] || false}
                                        onChange = {() => handleCompleteSelect(order)} 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button class="updateOrder_button" onClick={handleUpdateClick}>
                    <Link to='/orders' class="updateOrder_buttonlink">Update Order</Link>
                </button>
                <button class="updateOrder_button">
                    <Link to='/orders' class="updateOrder_buttonlink">Return Without Updating</Link>
                </button>
            </div>
        </>
    );
}

export default UpdateOrders;