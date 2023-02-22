import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function WaiterOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/waiterViewOrders/')
      .then(response => setOrders(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Order Time</th>
          <th>Table Number</th>
          <th>Items</th>
          <th>Confirmed</th>
          <th>Order Ready</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.orderTime}</td>
            <td>{order.tableNumber}</td>
            <td>{order.items}</td>
            <td>{order.confirmed ? 'Yes' : 'No'}</td>
            <td>{order.orderReady ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default WaiterOrders; 