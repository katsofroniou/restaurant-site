import React, { useState, useEffect } from "react";
import "../styling/Menu.css";
import axios from 'axios';

function Menu() {
    const [dish, setDish] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [calories, setCalories] = useState(false);
    const [basketItems, setBasketItems] = useState(JSON.parse(localStorage.getItem('basket')) || []);

    useEffect(() => {
        getDishFiltered();
    }, [])

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

    const [quantity, setQuantity] = useState([]);

    useEffect(() => {
        setQuantity(dish.map(() => 0));
    }, [dish]);

    const handleDecrease = (index) => {
        if (quantity[index] > 0) {
            const updatedQuantity = [...quantity];
            updatedQuantity[index] = updatedQuantity[index] - 1;
            setQuantity(updatedQuantity);
        }
    }

    const handleIncrease = (index) => {
        const updatedQuantity = [...quantity];
        updatedQuantity[index] = updatedQuantity[index] + 1;
        setQuantity(updatedQuantity);
    }

    const addToBasket = () => {
        const itemsToAdd = dish.reduce((acc, currentDish, index) => {
            if (quantity[index] > 0) {
                const existingItem = basketItems.find(
                    (item) => item.dish.name === currentDish.name
                );
                if (existingItem) {
                    // The dish already exists in the basket, so update its quantity
                    existingItem.quantity += quantity[index];
                } else {
                    // The dish doesn't exist in the basket, so add it
                    acc.push({
                        dish: currentDish,
                        quantity: quantity[index]
                    });
                }
            }
            return acc;
        }, []);

        setBasketItems((prevBasketItems) => [...prevBasketItems, ...itemsToAdd]);
    };

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basketItems));
    }, [basketItems]);

    return (
        <>
            <div className="menu-container">
                <div class="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <h1 className="menu-header">Menu</h1>

                    <div class="menu-button-container">
                        <button class="menu_button" onClick={handleToggle}>Show Calories</button>
                        <button class="menu_button">Call waiter</button>
                        <button class="menu_button" onClick={addToBasket}>Add To Basket</button>
                    </div>
                </div>


                <table class="menu_table">
                    <tr>
                        <th>Dish</th>
                        <th>Description</th>
                        <th>Course</th>
                        <th>Allergens</th>
                        <th>Vegan/Vegetarian</th>
                        {calories && <th>Calories</th>}
                        <th>Cost</th>
                        <th>Quantity</th>
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
                            <td>
                                <button onClick={() => handleIncrease(index)}>+</button>
                                <span>{quantity[index]}</span>
                                <button onClick={() => handleDecrease(index)}>-</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default Menu;