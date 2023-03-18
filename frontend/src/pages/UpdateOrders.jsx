import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import "../styling/UpdateOrders.css";
import axios from 'axios';

function UpdateOrders() {
    const [orders, setOrders] = useState([]);

    const access_token = localStorage.getItem('access_token');

    const config = {
        headers: { Authorization: `Bearer ${access_token}` }
    };

    const getOrders = async () => {
        const response = await axios.get('http://127.0.0.1:8000/orders/api')
        setOrders(response.data)
    }

    useEffect(() => {
        getOrders();
    }, [])

    const handleConfirmSelect = (orderToUpdate) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderToUpdate.id) {
                order.confirmed = !order.confirmed;
            }
            return order;
        });
    };

    const handleReadySelect = (orderToUpdate) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderToUpdate.id) {
                order.orderReady = !order.orderReady;
            }
            return order;
        });
    };

    const handleCompleteSelect = (orderToUpdate) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderToUpdate.id) {
                order.OrderComplete = !order.OrderComplete;
            }
            return order;
        });
    };

    const handleUpdateClick = async () => {
        try {
            for (let i = 0; i < orders.length; i++) {
                const response = await axios.put(
                    `http://127.0.0.1:8000/orders/api/${orders[i].id}/`,
                    orders[i],
                    config
                );
                console.log(response);
            }

            setOrders(orders)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div class="updateOrder_torso">
                <Table class="updateOrder_Table">
                    <thead>
                        <tr>
                            <th class="updateOrder_th">Order ID</th>
                            <th class="updateOrder_th">Table Number</th>
                            <th class="updateOrder_th">Confirmed</th>
                            <th class="updateOrder_th">Update Confirmed?</th>
                            <th class="updateOrder_th">Order Ready</th>
                            <th class="updateOrder_th">Update Ready?</th>
                            <th class="updateOrder_th">Order Complete</th>
                            <th class="updateOrder_th">Update Complete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td class="updateOrder_td">{order.id}</td>
                                <td class="updateOrder_td">{order.tableNumber}</td>
                                {order.confirmed === true && <td class="updateOrder_td">Confirmed</td>}
                                {order.confirmed === false && <td class="updateOrder_td">Unconfirmed</td>}
                                <td class="updateOrder_td">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleConfirmSelect(order)}
                                    />
                                </td>
                                {order.orderReady === true && <td class="updateOrder_td">Ready</td>}
                                {order.orderReady === false && <td class="updateOrder_td">Not Ready</td>}
                                <td class="updateOrder_td">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleReadySelect(order)}
                                    />
                                </td>
                                {order.OrderComplete === true && <td class="updateOrder_td">Complete</td>}
                                {order.OrderComplete === false && <td class="updateOrder_td">Not Complete</td>}
                                <td class="updateOrder_td">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCompleteSelect(order)}
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