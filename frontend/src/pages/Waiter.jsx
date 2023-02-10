import React from "react";
import "../styling/Waiter.css";

function Waiter () {
    return (
        <>
            <table class="menu_table">
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Calories</th>
                    <th>Vegan/Vegetarian</th>
                    <th>Allergens</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td>Empty Item</td>
                    <td>Empty Description</td>
                    <td>Empty Calories</td>
                    <td>Empty Vegan</td>
                    <td>Empty Allergens</td>
                    <td>Empty Cost</td>  
                </tr>
            </table>
            <button id="addButton">Add to Menu</button>
        </>
    );
}

export default Waiter;