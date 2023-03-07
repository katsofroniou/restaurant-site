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