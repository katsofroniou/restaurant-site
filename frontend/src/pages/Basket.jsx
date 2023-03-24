import React, { useState, useEffect } from "react";
import "../styling/Basket.css";
import { Link } from "react-router-dom";
/**
 * @file Basket.jsx contains the frontend page for the basket of items in an order.
 * @author Katerina Sofroniou
 * @author Jonathan Lloyd
 */


/**
 * @function Basket
 * @returns {JSX.Element} Returns the constructed page for the Basket
 */
function Basket() {
  /**
   * @type {[BasketItem[], Function]} A state hook that stores the current basket items and the function to update them.
   */
  const [basketItems, setBasketItems] = useState([]);

  /**
   * React effect hook that updates the basket items when the component mounts.
   * Retrieves stored basket items from localStorage and maps them to a new format before updating the state.
   */
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    const newBasketItems = storedBasket.map((item) => ({
      dish: item.name ? item : item.dish,
      quantity: item.quantity || 1,
    }));
    setBasketItems(newBasketItems);
  }, []);

  /**
   * The total price of all items in the basket.
   * @type {number}
   */
  const totalPrice = basketItems.reduce(
    (acc, item) => acc + item.dish.price * item.quantity,
    0
  );

  /**
   * Removes an item from the basket items array and updates local storage.
   * @param {number} index - The index of the item to be removed.
   * @returns {void}
   */
  const removeItem = (index) => {
    const updatedItems = [
      ...basketItems.slice(0, index),
      ...basketItems.slice(index + 1),
    ];
    setBasketItems(updatedItems);
    localStorage.setItem("basket", JSON.stringify(updatedItems));
  };

  /**
   * Decreases the quantity of an item in the basket items array by 1 and updates local storage.
   * @param {number} index - The index of the item whose quantity is to be decreased.
   * @returns {void}
   */
  const decreaseQuantity = (index) => {
    const updatedItems = [...basketItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity--;
      setBasketItems(updatedItems);
      localStorage.setItem("basket", JSON.stringify(updatedItems));
    }
  };

  /**
   * Increases the quantity of an item in the basket items array by 1 and updates local storage.
   * @param {number} index - The index of the item whose quantity is to be increased.
   * @returns {void}
   */
  const increaseQuantity = (index) => {
    const updatedItems = [...basketItems];
    updatedItems[index].quantity++;
    setBasketItems(updatedItems);
    localStorage.setItem("basket", JSON.stringify(updatedItems));
  };

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
              <button class="place-order-button">
                <Link to='/checkout' className="place-order-button">
                  Go to Checkout
                </Link>
              </button>
            </td>
          </tr>
        </thead>
      </table>

    </div>
  );
}

export default Basket;
