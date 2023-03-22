import React from "react";
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import "../styling/KitchenOrders.css";
import axios from 'axios';
/**
 * @author Kayleigh Reid
 * @author Jonathan Lloyd
 * @file KitchenOrders.jsx contains the frontend page with the Kitchen Staff display of orders.
 */

/**
 * @function KitchenOrders
 * @returns {JSX.Element} Returns the constructed page for KitchenOrders.
 */
function KitchenOrders() {
    /**
     * A stateful value of an order
     * @typedef {any[]} OrdersState - Array of objects representing the orders.
     * @type {OrdersState}
     */
    const [orders, setOrders] = useState([]);

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

export default KitchenOrders;