import React from "react";
import "../styling/Menu.css";

function Menu () {
    return (
        <>
            <button class="menu_button">Show Callories and Allergens</button>
            <button class="menu_button">call waiter</button>
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