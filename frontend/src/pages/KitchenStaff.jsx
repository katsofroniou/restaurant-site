import React from "react";
import kitchenStyle from "../styling/KitchenStaff.module.css";

function KitchenStaff () {
    return (
        <>
            <h1 class="header">Kitchen</h1>
            <button class={kitchenStyle.kitchen_button} type="button">Notify Waiters</button>

            
        </>
    );
}

export default KitchenStaff;