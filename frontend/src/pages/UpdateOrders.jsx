import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import "../styling/UpdateOrders.css";
import axios from 'axios';

function UpdateOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedConfirmedItems, setSelectedConfirmedItems] = useState([]);
    const [selectedReadyItems, setSelectedReadyItems] = useState([]);
    const [selectedCompleteItems, setSelectedCompleteItems] = useState({});

    const getOrder = async () => {
        const response = await axios.get('http://127.0.0.1:8000/orders/api')
        setOrders(response.data)
    }

    useEffect(() => {
        getOrder();
    }, [])

    const handleConfirmSelect = (selectedOrder) => {
        setSelectedConfirmedItems(
            selectedConfirmedItems => [...selectedConfirmedItems, selectedOrder]
        );
    };
    
    const handleReadySelect = (selectedOrder) => {
        //console.log(selectedOrder); //DEBUGS
        setSelectedReadyItems(
            selectedReadyItems => [...selectedReadyItems, selectedOrder]
        );
    };

    const handleCompleteSelect = (selectedOrder) => {
        setSelectedCompleteItems(prevState => ({
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
        const updateConfirmed = [];
        const updateReady = [];
        const updateComplete = [];

        //Object.keys(selectedConfirmedItems).forEach((confirmed) => {
        //    if (selectedConfirmedItems[confirmed]) {
        //      //console.log(selectedConfirmedItems); //DEBUG
        //        updateConfirmed.push(confirmed);
        //    }
        //});

        for( let i = 0; i < selectedConfirmedItems; i++ ) {
            let confirmObj = selectedConfirmedItems[i]
            confirmObj.confirmed = !confirmObj.confirmed;
            updateConfirmed.push(confirmObj)
        }
        //Object.keys(selectedReadyItems).forEach((orderReady) => {
            //if (selectedReadyItems[orderReady]) {
            //    updateReady.push(orderReady);
            //}
            
        //});

        for( let i = 0; i < selectedReadyItems.length; i++ ) {
            let currObj = selectedReadyItems[i]
            currObj.orderReady = !currObj.orderReady;
            updateReady.push(currObj)
        }
        
        //Object.keys(selectedCompleteItems).forEach((OrderComplete) => {
        //    if (selectedCompleteItems[OrderComplete]) {
        //        updateComplete.push(OrderComplete);
        //    }
        //});

        for( let i = 0; i < selectedCompleteItems.length; i++ ) {
            let compObj = selectedCompleteItems[i]
            compObj.OrderComplete = !compObj.OrderComplete;
            updateComplete.push(compObj)
        }

        console.log("sending...", updateConfirmed); //DEBUG
        if (updateConfirmed.length > 0) {
            try {
                await Promise.all(updateConfirmed.map(order => {
                    return axios({
                        method: 'PUT',
                        url: `http://127.0.0.1:8000/orders/api/${order}`,
                        headers: {
                            'Authorization' : `Bearer ${access_token}`
                        },
                    });
                }));
            } catch (error) {
                console.error(error);
            }
        }

        console.log("sending...", updateReady); //DEBUG
        if (updateReady.length > 0) {
            try {
                await Promise.all(updateReady.map(order => {
                    return axios({
                        method: 'PUT',
                        url: `http://127.0.0.1:8000/orders/api/${order}`,
                        headers: {
                            'Authorization' : `Bearer ${access_token}`
                        },
                    });
                }));
            } catch (error) {
                console.error(error);
            }
        }

        console.log("sending...", updateComplete); //DEBUG
        if (updateComplete.length > 0) {
            try {
                await Promise.all(updateComplete.map(order => {
                    return axios({
                        method: 'PUT',
                        url: `http://127.0.0.1:8000/orders/api/${order}`,
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
                                        //checked = {selectedConfirmedItems[order.confirmed] || false}
                                        onChange = {() => handleConfirmSelect(order)}
                                    />
                                </td>
                                {order.orderReady === true && <td class="updateOrder_td">Ready</td>}
                                {order.orderReady === false && <td class="updateOrder_td">Not Ready</td>}
                                <td class="updateOrder_td">
                                    <input 
                                        type = "checkbox"
                                        //checked = {order.orderReady}
                                        onChange = {() => handleReadySelect(order)}
                                    />
                                </td>
                                {order.OrderComplete === true && <td class="updateOrder_td">Complete</td>}
                                {order.OrderComplete === false && <td class="updateOrder_td">Not Complete</td>}
                                <td class="updateOrder_td">
                                    <input
                                        type = "checkbox"
                                        //checked = {selectedCompleteItems[order.OrderComplete] || false}
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