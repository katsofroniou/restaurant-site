import React from "react";
import orderStyle from "../styling/Orders.module.css";
import WaiterOrders from "./WaiterOrders";


// This page will only be visible to waiter and kitchen staff - not to the customer

function Orders () {
    return(
        <>
            <div class={orderStyle.torso}>
                <WaiterOrders />
                <button class={orderStyle.button} type = "submit" >Cancel Order</button>
            </div>
        </>
    );
}

export default Orders;