import React, { useState } from "react";
import "../styling/Menu.css";

function Menu () {
    const [waiterCalled, setWaiterCalled] = useState(false);
    const handleCallWaiter = () => {
        fetch('/call-waiter/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({notification_type: "call_waiter"})
        })
        .then(response => response.json())
        .then(data => {
            setWaiterCalled(true);
            console.log("Waiter has been called!");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    return (
        <>
            <button class="menu_button">Show Callories and Allergens</button>
            <button className="menu_button" onClick={handleCallWaiter} disabled={waiterCalled}>
                {waiterCalled ? "Waiter Called" : "Call Waiter"}
            </button>
            <table class="menu_table">
                <tr>
                    <th>Mains</th>
                    <th>Description</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td>Example Item</td>
                    <td>Example Description</td>
                    <td>Example Cost</td>  
                </tr>
            </table>
            <table class="menu_table">
                <tr>
                    <th>Platters</th>
                    <th>Description</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td>Example Item</td>
                    <td>Example Description</td>
                    <td>Example Cost</td>  
                </tr>
            </table>
            <table class="menu_table">
                <tr>
                    <th>Drinks</th>
                    <th>Description</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td>Example Item</td>
                    <td>Example Description</td>
                    <td>Example Cost</td>
                </tr>
            </table>
        </>  
    );
}

export default Menu;