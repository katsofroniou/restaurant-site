import React, { useState } from "react";
import dishes from "./Menu.jsx";
import "../styling/Basket.css";

function Basket() {
    const [basketItems, setBasketItems] = useState([["chocolate", 5, 5], ["marshmallow", 6, 0.6]]);

    const removeItem = (index) => {
        const updatedItems = [
            ...basketItems.slice(0, index),
            ...basketItems.slice(index + 1),
        ];
        setBasketItems(updatedItems);
    };

    const incrementQuantity = (index) => {
        const updatedItems = [...basketItems];
        updatedItems[index][1]++;
        setBasketItems(updatedItems);
    };

    const decrementQuantity = (index) => {
        const updatedItems = [...basketItems];
        if (updatedItems[index][1] > 1) {
            updatedItems[index][1]--;
            setBasketItems(updatedItems);
        }
    };

    return (
        <>
            <h1 className="header">Basket</h1>
            <ul className="basket-list">
                {basketItems.map((item, index) => (
                    <li key={index} className="basket-item">
                        <div className="item-info">
                            <div className="item-name">{item[0]}</div>
                            <div className="item-quantity">
                                <button className="quantity-btn" onClick={() => decrementQuantity(index)}>-</button>
                                {item[1]}
                                <button className="quantity-btn" onClick={() => incrementQuantity(index)}>+</button>
                            </div>
                        </div>
                        <div className="item-price">£{item[2].toFixed(2)}</div>
                        <button className="remove-btn" onClick={() => removeItem(index)}>
                            Remove Item
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Basket;