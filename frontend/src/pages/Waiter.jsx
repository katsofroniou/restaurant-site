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
                    <th>Vegetarian</th>
                    <th>Vegan</th>
                    <th>Allergens</th>
                    <th>Cost</th>
                    <th>Available</th>
                    <th>Delete?</th>
                </tr>
                <tr>
                    <td>Empty Item</td>
                    <td>Empty Description</td>
                    <td>Empty Calories</td>
                    <td>Empty Vegetarian</td>
                    <td>Empty Vegan</td>
                    <td>Empty Allergens</td>
                    <td>Empty Cost</td>
                    <td>Empty Availability</td>
                    <td>
                        <input type="checkbox"></input>
                    </td>  
                </tr>
            </table>
            <button class="add_button">
                <Link to='/additem' class="button_link">Add to Menu</Link>
            </button>
            <button class="add_button">
                <Link to='/waiter' class="button_link">Delete From Menu</Link>
            </button>
        </>
    );
}

export default Waiter;