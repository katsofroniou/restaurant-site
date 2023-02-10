import React from "react";
import { Link } from 'react-router-dom';
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
                    <th>Delete?</th>
                </tr>
                <tr>
                    <td>Empty Item</td>
                    <td>Empty Description</td>
                    <td>Empty Calories</td>
                    <td>Empty Vegan</td>
                    <td>Empty Allergens</td>
                    <td>Empty Cost</td>
                    <td>
                        <input type="checkbox"></input>
                    </td>  
                </tr>
            </table>
            <button class="add_button">
                <Link to='/additem' class="button_link">Add to Menu</Link>
            </button>
        </>
    );
}

export default Waiter;