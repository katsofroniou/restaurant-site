import React, { useState, useEffect } from "react";
import menuStyle from "../styling/Menu.module.css";
import axios from 'axios';

function Menu() {
    const [dish, setDish] = useState([])

    const getDish = async () => {
        const response = await axios.get('http://127.0.0.1:8000/menu/api')
        setDish(response.data)
    }

    useEffect(() => {
        getDish();
    }, [])

    const [calories, setCalories] = useState(false);

    const handleToggle = () => {
        setCalories((current) => !current);
    };

    return (
        <>
            <div className={menuStyle.search_container}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={menuStyle.search_input}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className={menuStyle.search_button} onClick={handleSearch}>
                    Search
                </button>
            </div>
            <button class={menuStyle.menu_button} onClick={handleToggle}>Show Calories</button>
            <button class={menuStyle.menu_button}>Call waiter</button>

            <table class={menuStyle.menu_table}>
                <tr>
                    <th>Dish</th>
                    <th>Description</th>
                    <th>Course</th>
                    <th>Allergens</th>
                    <th>Vegan/Vegetarian</th>
                    {calories && <th>Calories</th>}
                    <th>Cost</th>
                </tr>
                {dish.map((dish, index) => (
                    <tr>
                        <td>{dish.name}</td>
                        <td>{dish.description}</td>
                        <td>{dish.course}</td>
                        <td>{dish.allergens.join(", ")}</td>
                        {dish.vegan === true && <td>Vegan</td>}
                        {dish.vegetarian === true && dish.vegan === false && <td>Vegetarian</td>}
                        {dish.vegetarian === false && <td>N/A</td>}
                        {calories && <td>{dish.kcal}</td>}
                        <td>£{dish.price.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                ))}
            </table>
        </>
    );
}

export default Menu;