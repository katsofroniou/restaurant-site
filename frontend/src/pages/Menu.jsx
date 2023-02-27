import React, { useState, useEffect } from "react";
import "../styling/Menu.css";
import axios from 'axios';

function Menu() {
    const [dish, setDish] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getDishFiltered();
    }, [])

    const [calories, setCalories] = useState(false);

    const getDishFiltered = async () => {
        let url = 'http://127.0.0.1:8000/menu/api';
        const params = {};
        if (searchTerm) {
          params['search'] = searchTerm;
        }
        const response = await axios.get(url, { params });
        setDish(response.data);
    };

    useEffect(() => {
        getDishFiltered();
    }, [searchTerm]);

    const handleToggle = () => {
        setCalories((current) => !current);
    };

    const handleSearch = () => {
        getDishFiltered();
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button class="menu_button" onClick={handleToggle}>Show Calories</button>
            <button class="menu_button">Call waiter</button>

            <table class="menu_table">
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