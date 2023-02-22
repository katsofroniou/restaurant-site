import React from "react";
import orderStyle from "../styling/Orders.module.css";


// This page will only be visible to waiter and kitchen staff - not to thd customer
// Buttons just represent order stack
// Ive got no idea how to turn the orange box inside the containers white

function Orders () {
    return(
        <>
            <div class={orderStyle.torso}>
                <div class={orderStyle.form_container}>
                    <form class={orderStyle.form}>
                        <h2 class={orderStyle.form_title}>Pending orders</h2>
                        <div class="form_message form_message-error"></div>
                        <button class={orderStyle.form_button} type="submit">Order no. ######</button>
                        <button class={orderStyle.form_button} type="submit">Order no. ######</button>
                        <button class={orderStyle.form_button} type="submit">Order no. ######</button>
                        <button class={orderStyle.form_button} type="submit">Order no. ######</button>
                        <button class={orderStyle.form_button} type="submit">Confirm order</button>
                    </form>
                </div>
                <div class={orderStyle.form_container}>
                    <form class={orderStyle.form}>
                        <h2 class={orderStyle.form_title}>Confirmed orders</h2>
                        <div class="form_message form_message-error"></div>
                        <button class={orderStyle.form_button} type="submit">Order no. ######</button>
                        <button class={orderStyle.form_button} type="submit">Order no. ######</button>
                        <button class={orderStyle.form_button} type="submit">Order no. ######</button>
                        <button class={orderStyle.form_button} type="submit">Order no. ######</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Orders;