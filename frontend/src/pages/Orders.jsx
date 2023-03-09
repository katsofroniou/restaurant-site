import React from "react";
import "../styling/Orders.css";
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// This page will only be visible to waiter and kitchen staff - not to the customer

function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedItems, setSelectedItems] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/orders/api')
            .then(response => setOrders(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleItemSelect = (selectedDish) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [selectedDish.name]: !prevState[selectedDish.name],
        }));
    };

    const handleDeliveredClick = async () => {
        // Get the access_token from local storage
        const access_token = localStorage.getItem('access_token');

        // If access_token is null or empty, the user is not authenticated
        if (!access_token) {
            console.log('User not authenticated');
            return;
        }

        // Delivered the selected items
        const deliveredItems = [];

        Object.keys(selectedItems).forEach((name) => {
            if (selectedItems[name]) {
                deliveredItems.push(name);
            }
        });

        if (deliveredItems.length > 0) {
            try {
                await Promise.all(deliveredItems.map(dish => {
                    return axios({
                        method: 'PATCH', //may change this to delete
                        url: `http://127.0.0.1:8000/menu/api/${dish}`,
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    });
                }));

                // Update the state to remove the deleted items
                const newDish = orders.filter((d) => !deliveredItems.includes(d.name));
                setOrders(newDish);

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
                            <th>Delivered</th>
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
                                <td><input type="checkbox"></input></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button class="order_button" type="submit" >Cancel Order</button>
                <button className="waiter_add_button" onClick={handleDeliveredClick}>
                <Link to='/orders' class="waiter_button_link">Order Delivered</Link>
            </button>
            </div>
        </>
    );
}

export default Orders;