import React, { useState, useEffect } from "react";
import "../styling/Menu.css";
import axios from 'axios';
/**
 * @file Menu.jsx contains the frontend page of the Menu.
 * @author Katerina Sofroniou
 * @author Natalia Widmann
*/

/**
 * @function Menu
 * @returns {void} Returns the constructed page for the Menu.
*/
function Menu() {
    /**
     * Stateful value of a dish.
     * @typedef {any[]} DishState - Array of objects representing the dishes.
     * @type {DishState}
    */
    const [dish, setDish] = useState([])
    /**
     * Stateful value of a searchTerm.
     * @typedef {String[]} SearchTermState - Array of string representing the search terms.
     * @type {SearchTermState}
    */
    const [searchTerm, setSearchTerm] = useState("");
    /**
     * Stateful value of calories.
     * It's used to determine when calories should and should not be displayed.
     * @typedef {Boolean} CaloriesState - Boolean representing the toggle of the calories display.
     * @type {CaloriesState}
    */
    const [calories, setCalories] = useState(false);
    /**
     * Stateful value of the basket items in a React component.
     * @typedef {any[]} BasketItemsState - Array of objects representing the items in the basket.
     * @type {BasketItemsState}
    */
    const [basketItems, setBasketItems] = useState(JSON.parse(localStorage.getItem('basket')) || []);

    /**
     * useEffect hook to fetch a filtered list of dishes and update the dish stateful value in a React component.
     * @function
     * @name useGetDishFilteredEffect
     * @param {string} searchTerm - The search term used to filter the list of dishes.
     * @returns {void}
     */
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

    /**
     * Sets calories to the opposite of the current state value.
     */
    const handleToggle = () => {
        setCalories((current) => !current);
    };

    /**
     * useState hook for the quantity of each dish in the component.
     * @type {Array}
     * */
    const [quantity, setQuantity] = useState([]);

    /**
     * useEffect hook to set the initial quantity of each dish to 0 when the dish prop is updated
     * @param {Array} dish - the array of dishes
     */
    useEffect(() => {
        setQuantity(dish.map(() => 0));
    }, [dish]);

    /**
     * Event handler to decrease the quantity of a dish
     * @param {number} index - the index of the dish to decrease the quantity of
     * */
    const handleDecrease = (index) => {
        if (quantity[index] > 0) {
            const updatedQuantity = [...quantity];
            updatedQuantity[index] = updatedQuantity[index] - 1;
            setQuantity(updatedQuantity);
        }
    }

    /**
     * Event handler to increase the quantity of a dish
     * @param {number} index - the index of the dish to increase the quantity of
     */
    const handleIncrease = (index) => {
        const updatedQuantity = [...quantity];
        updatedQuantity[index] = updatedQuantity[index] + 1;
        setQuantity(updatedQuantity);
    }

    /**
     * Function to add items to the basket
     */
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

    /**
     * useEffect hook to save the basketItems state to local storage when it is updated
     */
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