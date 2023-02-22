import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import waiterSyle from"../styling/Waiter.module.css";
import axios from 'axios';

function Waiter () {
    const[dish, SetDish] = useState([])

    const getDish = async () => {
        const response = await axios.get('http://127.0.0.1:8000/menu/api')
        SetDish(response.data)
    }

    useEffect(() =>{
        getDish();
    }, [])
    
    return (
        <>
            
            <table class={waiterSyle.menu_table}>
                <tr>
                    <th>Course</th>
                    <th>Dish</th>
                    <th>Description</th>
                    <th>Calories</th>
                    <th>Vegetarian</th>
                    <th>Vegan</th>
                    <th>Allergens</th>
                    <th>Cost</th>
                    <th>Available</th>
                    <th>Delete?</th>
                </tr>
                { dish.map((dish, index) =>(
                    <tr>
                        <td>{dish.course}</td>
                        <td>{dish.name}</td>
                        <td>{dish.description}</td>
                        <td>{dish.kcal}</td>
                        {dish.vegetarian === true && <td>Yes</td>}
                        {dish.vegetarian === false && <td>No</td>}
                        {dish.vegan === true && <td>Yes</td>}
                        {dish.vegan === false && <td>No</td>}
                        <td>{dish.allergens.join(", ")}</td>
                        <td>£{dish.price.toLocaleString("en-GB", {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        {dish.available === true && <td>Yes</td>}
                        {dish.available === false && <td>No</td>}
                        <td><input type="checkbox"></input></td>
                    </tr>
                ))}
            </table>
            <button class={waiterSyle.add_button}>
                <Link to='/additem' class={waiterSyle.button_link}>Add to Menu</Link>
            </button>
            <button class={waiterSyle.add_button}>
                <Link to='/waiter' class={waiterSyle.button_link}>Delete From Menu</Link>
            </button>
        </>
    );
}

export default Waiter;