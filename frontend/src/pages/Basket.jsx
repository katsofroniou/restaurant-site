import React, { useState } from "react";
import dishes from "./Menu.jsx";
import "../styling/Basket.css";

function Basket() {
  const [basketItems, setBasketItems] = useState([
    ["chocolate", 5, 1],
    ["marshmallow", 6, 0.1],
  ]);

  const totalPrice = basketItems.reduce((acc, item) => acc + item[1] * item[2], 0);

  const removeItem = (index) => {
    const updatedItems = [
      ...basketItems.slice(0, index),
      ...basketItems.slice(index + 1),
    ];
    setBasketItems(updatedItems);
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...basketItems];
    if (updatedItems[index][1] > 1) {
      updatedItems[index][1]--;
      setBasketItems(updatedItems);
    }
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...basketItems];
    updatedItems[index][1]++;
    setBasketItems(updatedItems);
  };

  return (
    <>
      <h1 className="header">Basket</h1>
      <table className="basket-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {basketItems.map((item, index) => (
            <tr key={index} className="basket-item">
              <td>{item[0]}</td>
              <td>
                <div className="quantity-buttons">
                  <button className="quantity-btn" onClick={() => increaseQuantity(index)}>+</button>
                  <span className="item-quantity">{item[1]}</span>
                  <button className="quantity-btn" onClick={() => decreaseQuantity(index)}>-</button>
                </div>
              </td>
              <td className="price-container">£{(item[2] * item[1]).toFixed(2)}</td>
              <td className="remove-btn-container">
                <button className="remove-btn" onClick={() => removeItem(index)}>
                  Remove Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table class="basket-total-table">
        <thead>
          <tr>
            <th class="total-price-container">Total - £{totalPrice.toFixed(2)}</th>
          </tr>
          <tr>
            <td class="total-price-container">
              <button class="place-order-button">Place Order</button>
            </td>
          </tr>
        </thead>
      </table>

    </>
  );
}

export default Basket;
