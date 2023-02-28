import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styling/AddItem.css";

function AddItem () {
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

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
      
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(formData);
    
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