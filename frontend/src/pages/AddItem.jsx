import React from "react";
import "../styling/AddItem.css";

function AddItem () {
    return (
        <>
            <button id="add_button">
                <Link to='/waiter' id="button_link">Add Item to Menu</Link>
            </button>
        </>
    );
}

export default AddItem;