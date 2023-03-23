import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import "../styling/UpdateOrders.css";
import axios from 'axios';
/**
 * @author Natalia Widmann
 * @author Katerina Sofroniou 
 * @author Kayleigh Reid
 * @file UpdateOrders.jsx contains the frontend page for changing the status of an order.
 */

/**
 * @function UpdateOrders
 * @returns {JSX.Element}
 */
function UpdateOrders() {
    /**
     * A stateful value of an order
     * @typedef {any[]} OrdersState - Array of objects representing the orders.
     * @type {OrdersState}
     */
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

    /**
     * Handles selecting/unselecting the confirmation status of an order.
     * @param {Object} orderToUpdate - The order to update.
     * @param {boolean} orderToUpdate.id - The ID of the order to update.
     * @param {boolean} orderToUpdate.confirmed - The confirmation status of the order to update.
     * @returns {Array<Object>} - An array of updated orders.
     */
    const handleConfirmSelect = (orderToUpdate) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderToUpdate.id) {
                order.confirmed = !order.confirmed;
            }
            return order;
        });
    };

    /**
     * Handles selecting/unselecting the ready status of an order.
     * @param {Object} orderToUpdate - The order to update.
     * @param {boolean} orderToUpdate.id - The ID of the order to update.
     * @param {boolean} orderToUpdate.orderReady - The ready status of the order to update.
     * @returns {Array<Object>} - An array of updated orders.
     */
    const handleReadySelect = (orderToUpdate) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderToUpdate.id) {
                order.orderReady = !order.orderReady;
            }
            return order;
        });
    };

    /**
     * Handles selecting/unselecting the completion status of an order.
     * @param {Object} orderToUpdate - The order to update.
     * @param {boolean} orderToUpdate.id - The ID of the order to update.
     * @param {boolean} orderToUpdate.OrderComplete - The completion status of the order to update.
     * @returns {Array<Object>} - An array of updated orders.
     */
    const handleCompleteSelect = (orderToUpdate) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderToUpdate.id) {
                order.OrderComplete = !order.OrderComplete;
            }
            return order;
        });
    };

    /**
     * Handles the click event of the Update button to update all orders in the database.
     * @async
     * @function handleUpdateClick
     * @returns {Promise<void>} A Promise that resolves when all orders have been updated.
     * @throws {Error} If there's an error while updating the orders.
     */
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
        window.location = "/orders";
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