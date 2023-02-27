import React from "react";
import "../styling/Orders.css";
import axios from 'axios';
import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


// This page will only be visible to waiter and kitchen staff - not to the customer

function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedRow, setSelectedRow] = useState(-1);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/orders/api')
            .then(response => setOrders(response.data))
            .catch(error => console.log(error));
    }, []);
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button class="order_button" type="submit" >Cancel Order</button>
            </div>
        </>
    );
}

export default Orders;