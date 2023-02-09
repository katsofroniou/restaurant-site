import React, { useState } from "react";
import "../styling/KitchenStaff.css";

function KitchenStaff () {
    const [orderReady, setOrderReady] = useState(false);
    const handleOrderReady = () => {
        fetch('/order-ready/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({notification_type: "order_ready"})
        })
        .then(response => response.json())
        .then(data => {
            setOrderReady(true);
            console.log("Kitchen staff has notified waiter order is ready.");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    return (
        <>
            <h1 class="header">Kitchen</h1>
            <button className="menu_button" onClick={handleOrderReady} disabled={orderReady}>
                {orderReady ? "Notify Waiter" : "Order Ready"}
            </button>
            
        </>
    );
}

export default KitchenStaff;