import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styling/AddItem.css";

/**
 * @file AddItem.jsx contains the frontend page to add items to the menu.
 * @author Katerina Sofroniou
 * @author Natalia Widmann
 */

/**
 * @function AddItem
 * @returns {JSX.Element} Returns the constructed page for AddItem.
 */
function AddItem () {
    /**
     * @typedef {Object} FormData
     * @property {string} name - Name of the dish.
     * @property {string} description - Description of the dish.
     * @property {string} kcal - Total kilocalories of the dish.
     * @property {string} vegetarian - Whether the dish is vegetarian or not.
     * @property {string} vegan - Whether the dish is vegan or not.
     * @property {string} allergens - List of allergens in the dish, separated by commas.
     * @property {string} price - Price of the dish.
     * @property {string} course - Course of the dish.
     * @property {string} available - Whether the dish is available or not.
     */
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        kcal: '',
        vegetarian: '',
        vegan: '',
        allergens: '',
        price: '',
        course: '',
        available: ''
      });
      /**
       * @function handleChange
       * @description Updates the form data state when a change event is triggered.
       * @param {Event} event - The change event that was triggered.
       * @returns {void}
       */      
      const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    
    /**
     * @function handleSubmit
     * @description Submits the form data to the backend API.
     * @async
     * @param {Event} event - The submit event that was triggered.
     * @throws {console.error(error);}
     * @returns {void}
     */
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(formData);

        // Formats form data with correct types
        const allergensArray = formData.allergens ? formData.allergens.split(',').map(allergen => allergen.trim().charAt(0).toUpperCase() + allergen.trim().slice(1)) : [];
        const kcal = parseInt(formData.kcal);
        const price = parseFloat(formData.price);
        const vegetarian = formData.vegetarian.toLowerCase().trim() === 'y' || formData.vegetarian.toLowerCase().trim() === 'yes';
        const vegan = formData.vegan.toLowerCase().trim() === 'y' || formData.vegan.toLowerCase().trim() === 'yes';
        const available = formData.available.toLowerCase().trim() === 'y' || formData.available.toLowerCase().trim() === 'yes';
    
        const formDataWithCorrectTypes = {
          ...formData,
          allergens: allergensArray,
          kcal,
          price,
          vegetarian,
          vegan,
          available
        };

        console.log(formDataWithCorrectTypes);

        const access_token = localStorage.getItem('access_token');

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            };
            const response = await axios.post('http://127.0.0.1:8000/menu/api', formDataWithCorrectTypes, { headers });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };      
    
    return (
        <>
            <div class="additem_torso">
                <div class="additem_form_container">
                    <form class="additem_form" id="login" onSubmit={handleSubmit}>
                        <div>
                            <input type="text" class="additem_form_input" autoFocus name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                        </div>
                        <div>
                            <input type="text" class="additem_form_input" autoFocus name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                        </div>
                        <div>
                            <input type="number" class="additem_form_input" autoFocus name="kcal" value={formData.kcal} onChange={handleChange}  placeholder="Calories" />
                        </div>
                        <div>
                            <input type="text" class="additem_form_input" autoFocus name="vegetarian" value={formData.vegetarian} onChange={handleChange}  placeholder="Vegetarian (y/n)" />
                        </div>
                        <div>
                            <input type="text" class="additem_form_input" autoFocus name="vegan" value={formData.vegan} onChange={handleChange} placeholder="Vegan (y/n)"/>
                        </div>
                        <div>
                            <input type="text" class="additem_form_input" autoFocus name="allergens" value={formData.allergens} onChange={handleChange} placeholder="Allergens" />
                        </div>
                        <div>
                            <input type="text" class="additem_form_input" autoFocus name="price" value={formData.price} onChange={handleChange} placeholder="Cost" />
                        </div>
                        <div>
                            <input type="text" class="additem_form_input" autoFocus name="course" value={formData.course} onChange={handleChange} placeholder="Course" />
                        </div>
                        <div>
                            <input type="" class="additem_form_input" autoFocus name="available" value={formData.available} onChange={handleChange} placeholder="Available (y/n)" />
                        </div>
                        <button class="additem_add_button" onClick={handleSubmit}>
                            <Link to='/waiter' class="additem_button_link">Add Item to Menu</Link>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddItem;