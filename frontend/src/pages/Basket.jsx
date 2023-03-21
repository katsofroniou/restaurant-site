import React, { useState, useEffect } from "react";
import "../styling/Basket.css";

function Basket() {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    const newBasketItems = storedBasket.map((item) => ({
      dish: item.name ? item : item.dish,
      quantity: item.quantity || 1,
    }));
    setBasketItems(newBasketItems);
  }, []);

  const totalPrice = basketItems.reduce(
    (acc, item) => acc + item.dish.price * item.quantity,
    0
  );

  const removeItem = (index) => {
    const updatedItems = [
      ...basketItems.slice(0, index),
      ...basketItems.slice(index + 1),
    ];
    setBasketItems(updatedItems);
    localStorage.setItem("basket", JSON.stringify(updatedItems));
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...basketItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity--;
      setBasketItems(updatedItems);
      localStorage.setItem("basket", JSON.stringify(updatedItems));
    }
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...basketItems];
    updatedItems[index].quantity++;
    setBasketItems(updatedItems);
    localStorage.setItem("basket", JSON.stringify(updatedItems));
  };

  const handleSubmit = () => {
    window.location.href = '/checkout';
  }

  return (
    <div className="table-wrapper">
      <h1 className="basket-header">Your Basket</h1>
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
              <td>{item.dish.name}</td>
              <td>
                <div className="quantity-buttons">
                  <button className="quantity-btn" onClick={() => increaseQuantity(index)}>+</button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => decreaseQuantity(index)}>-</button>
                </div>
              </td>
              <td className="price-container">£{(item.dish.price * item.quantity).toFixed(2)}</td>
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
              <button class="place-order-button" onClick={handleSubmit}>Place Order</button>
            </td>
          </tr>
        </thead>
      </table>

    </div>
  );
}

export default Basket;
