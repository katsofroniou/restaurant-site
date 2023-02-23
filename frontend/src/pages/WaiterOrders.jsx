import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import orderStyle from "../styling/Orders.module.css";

function WaiterOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/orders/api')
      .then(response => setOrders(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    
    <Table className={orderStyle.orderTable}>
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
          <tr key={order.id}>
            <td>{order.orderTime.substring(0,8)}</td>
            <td>{order.tableNumber}</td>
            <td>{order.items}</td>
            <td><input type= "checkbox"></input></td>
            <td><input type= "checkbox"></input></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default WaiterOrders; 