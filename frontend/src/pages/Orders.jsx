import React from "react";
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styling/Orders.css";
import axios from 'axios';
/**
 * @author Natalia Widmann
 * @author Jubai-Khalil Owusu-Afriyie
 * @author Davit Gevorgyan
 * @author Jonathan Lloyd
 * @author Kayleigh Reid
 * @file Orders.jsx contains the frontend page with the orders and their statuses.
 */

/**
 * @function Orders
 * @returns {JSX.Element} Returns the constructed page for Orders.
 */
function Orders() {
    /**
     * A stateful value of an order
     * @typedef {any[]} OrdersState- Array of objects representing the orders.
     * @type {OrdersState}
     */
    const [orders, setOrders] = useState([]);
    /**
     * Stateful vaule of a Row.
     * @typedef {any[]} RowState - Array of objects representing the rows.
     * @type {RowState}
     */
    const [selectedRow, setSelectedRow] = useState({});

    /**
     * Fetches orders from the server and sets orders state with the response data.
     * @async
     * @function getOrder
     * @returns {Promise<void>}
     */
    const getOrder = async () => {
        const response = await axios.get('http://127.0.0.1:8000/orders/api')
        setOrders(response.data)
    }

    // Run getOrder on component mount
    useEffect(() => {
        getOrder();
    }, [])

    /**
     * Selects an order and updates the selected row state.
     * @function handleOrderSelect
     * @param {Object} selectedOrder - The selected order object
     * @param {number} selectedOrder.id - The id of the selected order
     * @returns {void}
     */
    const handleOrderSelect = (selectedOrder) => {
        setSelectedRow(prevState => ({
            ...prevState,
            [selectedOrder.id]: !prevState[selectedOrder.id],
        }));
    };

    /**
     * Handles cancel button click event
     * Retrieves access token from local storage
     * Deletes selected orders with the help of axios library
     * If delete operation is successful, updates the state of the component
     * @returns {Promise<void>}
     */
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
        window.location = "/orders";
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
                            <th class="order_th">Confirmed</th>
                            <th class="order_th">Order Ready</th>
                            <th class="order_th">Order Complete</th>
                            <th class="order_th">Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr>
                                <td class="order_td">{order.orderTime.substring(0, 8)}</td>
                                <td class="order_td">{order.id}</td>
                                <td class="order_td">{order.tableNumber}</td>
                                {order.confirmed === true && <td class="order_td">Confirmed</td>}
                                {order.confirmed === false && <td class="order_td">Unconfirmed</td>}
                                {order.orderReady === true && <td class="order_td">Ready</td>}
                                {order.orderReady === false && <td class="order_td">Not Ready</td>}
                                {order.OrderComplete === true && <td class="order_td">Complete</td>}
                                {order.OrderComplete === false && <td class="order_td">Not Complete</td>}
                                <td class="order_td">
                                    <input
                                        type="checkbox"
                                        checked={selectedRow[order.id] || false}
                                        onChange={() => handleOrderSelect(order)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button class="order_button" type="submit" onClick={handleCancelClick}>
                    <Link to='/orders' class="order_buttonlink">Delete order</Link>
                </button>
            </div>
        </>
    );
}

export default Orders;