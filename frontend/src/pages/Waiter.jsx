import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styling/Waiter.css";
import axios from 'axios';
/**
 * @author Natalia Widmann
 * @author Davit Gevorgyan
 * @author Katerina Sofroniou
 * @file Waiter.jsx contains the frontend page with the menu where the waiters can delete items off of it.
 */

/**
 * @function Waiter
 * @returns {JSX.Element} Returns the constructed page for Waiters.
 */
function Waiter() {
    /**
     * State hook for storing the list of dishes.
     * @type {[Object[], function]} An array containing the list of dishes and a function to update it.
     */
    const [dish, SetDish] = useState([])

    /**
     * State hook for storing the selected items.
     * @type {[Object, function]} An object containing the selected items and a function to update it.
     */
    const [selectedItems, setSelectedItems] = useState({});
    
    /**
     * Fetches the list of dishes from the server using Axios.
     * @async
     * @function
     * @returns {Promise<void>} A Promise that resolves when the dishes have been fetched and stored in the state.
     */
    const getDish = async () => {
        const response = await axios.get('http://127.0.0.1:8000/menu/api')
        SetDish(response.data)
    }

    /**
     * Runs the getDish function when the component mounts.
     * @effect
     * @param {[]} An empty array that ensures this effect only runs once.
     */
    useEffect(() => {
        getDish();
    }, [])

    /**
     * Handles selection of a dish item.
     * @param {object} selectedDish - The selected dish object.
     * @param {string} selectedDish.name - The name of the selected dish.
     */
    const handleItemSelect = (selectedDish) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [selectedDish.name]: !prevState[selectedDish.name],
        }));
    };

    /**
     * Handles deletion of selected dish items.
     */
    
    const handleDeleteClick = async () => {
        // Get the access_token from local storage
        const access_token = localStorage.getItem('access_token');

        // If access_token is null or empty, the user is not authenticated
        if (!access_token) {
            console.log('User not authenticated');
            return;
        }

        // Delete the selected items
        const deleteItems = [];

        Object.keys(selectedItems).forEach((name) => {
            if (selectedItems[name]) {
                deleteItems.push(name);
            }
        });

        if (deleteItems.length > 0) {
            try {
                await Promise.all(deleteItems.map(dish => {
                    return axios({
                        method: 'DELETE',
                        url: `http://127.0.0.1:8000/menu/api/${dish}`,
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    });
                }));

                // Update the state to remove the deleted items
                const newDish = dish.filter((d) => !deleteItems.includes(d.name));
                SetDish(newDish);

            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <div class="waiter_menu_container">
                <table class="waiter_menu_table">
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
                    {dish.map((dish, index) => (
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
                            <td>£{dish.price.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            {dish.available === true && <td>Yes</td>}
                            {dish.available === false && <td>No</td>}
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedItems[dish.name] || false}
                                    onChange={() => handleItemSelect(dish)}
                                />
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <div class="waiter_button_div">
                <button class="waiter_add_button">
                    <Link to='/additem' class="waiter_button_link">Add to Menu</Link>
                </button>
                <button className="waiter_add_button" onClick={handleDeleteClick}>
                    <Link to='/waiter' class="waiter_button_link">Delete From Menu</Link>
                </button>
            </div>
        </>
    );
}

export default Waiter;