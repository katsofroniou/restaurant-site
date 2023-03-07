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
  
  }
  
