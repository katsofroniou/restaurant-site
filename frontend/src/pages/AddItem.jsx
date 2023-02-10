import React from "react";
import { Link } from 'react-router-dom';
import "../styling/AddItem.css";

function AddItem () {
    return (
        <>
            <div class="torso">
                <div class="form_container">
                    <form id="login">
                        <div class="form_message form_message-error"></div>
                        <div class="form_input-group">
                            <input type="text" class="form_input" autofocus placeholder="Type" />
                        </div>
                        <div class="form_input-group">
                            <input type="text" class="form_input" autofocus placeholder="Description" />
                        </div>
                        <div class="form_input-group">
                            <input type="number" class="form_input" autofocus placeholder="Calories" />
                        </div>
                        <div class="form_input-group">
                            <input type="text" class="form_input" autofocus placeholder="Vegan/Vegetarian" />
                        </div>
                        <div class="form_input-group">
                            <input type="text" class="form_input" autofocus placeholder="Allergens" />
                        </div>
                        <div class="form_input-group">
                            <input type="text" class="form_input" autofocus placeholder="Cost" />
                        </div>
                        <button id="add_button">
                            <Link to='/waiter' id="button_link">Add Item to Menu</Link>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddItem;