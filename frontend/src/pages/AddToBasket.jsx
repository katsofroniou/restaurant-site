import React from "react";
import "../styling/AddToBasket.css";
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function MenuItem({ name, price }) {
    const [quantity, setQuantity] = useState(0);
  
    function addToBasket() {
      setDishes(name, price, quantity);
      setQuantity(0);
    }
    
    return (
        <tr>
          <td>{name}</td>
          <td>${price}</td>
          <td>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
          </td>
          <td>
            <button onClick={addToBasket}>Add to basket</button>
          </td>
        </tr>
      );
  }
  
