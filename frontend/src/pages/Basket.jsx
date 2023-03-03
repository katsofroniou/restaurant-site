import React, { useState } from "react";
import dishes from "./Menu.jsx";
import "../styling/Basket.css";
function Basket() {
    const [basketItems, setBasketItems] = useState([["chocolate", 5, 5], ["marshmallow", 6, 0.6]]);

    return (
        <>
            <h1 className="header">Basket</h1>
            <ul className="basket-list">
                {basketItems.map((item, index) => (
                    <li key={index} className="basket-item">
                        <div className="item-info">
                            <div className="item-name">{item[0]}</div>
                            <div className="item-quantity">({item[1]}x)</div>
                        </div>
                        <div className="item-price">£{item[2].toFixed(2)}</div>

                    </li>
                ))}
            </ul>
        </>
    );
}

export default Basket;