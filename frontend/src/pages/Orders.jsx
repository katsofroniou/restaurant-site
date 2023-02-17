import React from "react";
import "../styling/Orders.css";


// This page will only be visible to waiter and kitchen staff - not to thd customer
// Buttons just represent order stack
// Ive got no idea how to turn the orange box inside the containers white

function Orders () {
    return(
        <>
            <div class="torso">
                <div class="form_container">
                    <form>
                        <h2 class="form_title">Pending orders</h2>
                        <div class="form_message form_message-error"></div>
                        <button class="form_button" type="submit">Order no. ######</button>
                        <button class="form_button" type="submit">Order no. ######</button>
                        <button class="form_button" type="submit">Order no. ######</button>
                        <button class="form_button" type="submit">Order no. ######</button>
                        <button class="form_button2" type="submit">Confirm order</button>
                    </form>
                </div>
                <div class="form_container">
                    <form>
                        <h2 class="form_title">Confirmed orders</h2>
                        <div class="form_message form_message-error"></div>
                        <button class="form_button" type="submit">Order no. ######</button>
                        <button class="form_button" type="submit">Order no. ######</button>
                        <button class="form_button" type="submit">Order no. ######</button>
                        <button class="form_button" type="submit">Order no. ######</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Orders;