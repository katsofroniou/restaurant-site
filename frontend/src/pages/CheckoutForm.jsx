import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_BASE } from "../api";
import { Link } from 'react-router-dom';
import "../styling/Checkout.css"


/**
 * @author Katerina Sofroniou
 * @function CheckoutForm
 * @returns {JSX.Element} Returns the checkout form
 */
const CheckoutForm = () => {
    /**
     * An error object that represents any errors that occur during form submission.
     * @type {Object | null}
     */
    const [error, setError] = useState(null);

    /**
     * A string representing the email entered by the user in the form.
     * @type {string}
     */
    const [email, setEmail] = useState('');
    /**
     * A string representing the first name entered by the user in the form.
     * @type {string}
     */
    const [firstName, setFirstName] = useState('');
    /**
     * A string representing the last name entered by the user in the form.
     * @type {string}
     */
    const [lastName, setLastName] = useState('');
    /**
     * A string representing the phone number entered by the user in the form.
     * @type {string}
     */
    const [phoneNumber, setPhoneNumber] = useState('');
    /**
     * An array representing the items currently in the user's basket.
     * @type {Object[]}
     */
    const [basket, setBasket] = useState([]);
    /**
     * A number representing the total price of the items in the user's basket.
     * @type {number}
     */
    const [price, setPrice] = useState(0);
    /**
     * A number representing the table number entered by the user in the form.
     * @type {number}
     */
    const [tableNum, setTableNum] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    /**
     * A hook that runs on mount to initialize the component state and fetch orders.
     * @function
     * @name useEffect
     * @param {function} callback - A function to execute after the component is mounted.
     * @param {Array} deps - An array of dependencies that will trigger a re-run of the effect when changed.
     * @returns {undefined}
     * */
    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
        
        /// Calculate the price of the stored items in the basket
        const calculatedPrice = storedBasket.reduce(
            (acc, item) => acc + item.dish.price * item.quantity,
            0
        );

        // Set the state for basket and price
        setPrice(calculatedPrice);
        setBasket(storedBasket);

        /**
         * A function that fetches orders from an API and checks for a table number to assign to the user.
         * @function
         * @name fetchOrders
         * @returns {Promise} A promise that resolves with the fetched orders.
         */
        const fetchOrders = async () => {
            const ordersResponse = await fetch('http://127.0.0.1:8000/orders/api');
            const orders = await ordersResponse.json();
            let tableNumExists = false;
            while (!tableNumExists) {
                for (const existingOrder of orders) {
                    if (existingOrder.tableNumber === tableNum) {
                        setTableNum(Math.floor(Math.random() * 40) + 1);
                        break;
                    }
                }
                tableNumExists = true;
            }
        };

        // Check if a table number has been assigned, and if not, assign a random one
        if (tableNum === 0) {
            setTableNum(Math.floor(Math.random() * 40) + 1);
        } else {
            fetchOrders();
        }
    }, []);

    /**
     * Function that handles a change in a form input's value
     * @param {Object} event - The event object passed to the function
     */
    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    }

    /**
     * Function that handles the submission of a form
     * @param {Object} event - The event object passed to the function
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.removeItem('basket');
        const card = elements.getElement(CardElement);
        const access_token = localStorage.getItem('access_token');

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        });

        /**
         * Object containing data needed to create a payment intent with Stripe
         * @type {Object}
         * @property {string} payment_method_id - The ID of the payment method created with Stripe
         * @property {number} amount - The total price of the items in the user's basket in pence/cents
         * @property {string} currency - The currency used for the transaction
         * @property {Object} metadata - Additional data about the user, including their name, phone number and email
         */
        const data = {
            payment_method_id: paymentMethod.id,
            amount: price * 100, // Stripe requires amount in pence/cents, so multiply by 100
            currency: "gbp",
            metadata: {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                email: email,
            },
        };

        try {
            const response = await axios.post(`${API_BASE}/payments/test-intent/`, data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        /**
         * Array containing the IDs of the dishes in the user's basket
         * @type {Array.<string>}
         */
        const dishes = [];

        basket.forEach(item => {
            const dish = item.dish.id;
            dishes.push(dish);
        });

        /**
         * The time at which the user placed their order
         * @type {string}
         */
        console.log(dishes)
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false, timeZone: 'Europe/London' });

        /**
         * Configuration object for creating an order
         * @type {Object}
         * @property {Object} headers - Object containing authorization token needed to authenticate user
         * @property {string} method - The HTTP method used for the request
         * @property {string} url - The URL of the API endpoint used to create the order
         * @property {Object} data - The data needed to create the order
         * @property {Array.<string>} data.items - The IDs of the dishes in the order
         * @property {string} data.orderTime - The time at which the order was placed
         * @property {number} data.tableNumber - The table number at which the user is seated
         * @property {boolean} data.confirmed - Whether the order has been confirmed
         * @property {boolean} data.orderReady - Whether the order is ready to be picked up
         * @property {boolean} data.orderComplete - Whether the order is complete
         * @property {boolean} data.orderDelivered - Whether the order has been delivered to the user
         */
        const orderConfig = {
            headers: { Authorization: `Bearer ${access_token}` },
            method: 'POST',
            url: 'http://127.0.0.1:8000/orders/api',
            data: {
                items: dishes,
                orderTime: time,
                tableNumber: tableNum,
                confirmed: false,
                orderReady: false,
                OrderComplete: false,
                orderDelivered: false
            }
        }

        let orderId;

        // Send the payment to the server and get the order ID
        try {
            const response = await axios(orderConfig);
            console.log(response.data);
            orderId = response.data.id;
        } catch (error) {
            console.error(error);
        }

        // Map the items in the basket to orderDishes objects
        const orderDishes = basket.map((item) => {
            return {
                order: orderId,
                dish: item.dish.id,
                quantity: item.quantity,
            };
        });

        // Send the orderDishes objects to the server
        const promises = orderDishes.map((orderDish) => {
            return axios.post('http://127.0.0.1:8000/orders/orderDish/', orderDish, {
                headers: { Authorization: `Bearer ${access_token}` },
            });
        });

        try {
            await Promise.all(promises);
            console.log("All requests completed");
        } catch (error) {
            console.error(error);
        }

        // Redirect the user to the homepage
        window.location.href = '/';
    }

    return (
        <div className="page-wrapper">
            <div className="checkout-wrapper">
                <h1 className="checkout-basket-header">Checkout</h1>
                <table className="checkout-basket-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.map((item, index) => (
                            <tr key={index} className="checkout-basket-item">
                                <td>{item.dish.name}</td>
                                <td>
                                    <span>{item.quantity}</span>
                                </td>
                                <td>£{(item.dish.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table class="checkout-total-table">
                    <thead>
                        <tr>
                            <th class="checkout-price-container">Total - £{price.toFixed(2)}</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <form onSubmit={handleSubmit} className="stripe-form">
                <div className="form-row">
                    <label>First Name</label>
                    <input className="form-input" id="name" type="text" placeholder="Jenny" required
                        value={firstName} onChange={(event) => { setFirstName(event.target.value); }} />
                </div>
                <div className="form-row">
                    <label>Last Name</label>
                    <input className="form-input" id="name" type="text" placeholder="Rosen" required
                        value={lastName} onChange={(event) => { setLastName(event.target.value); }} />
                </div>
                <div className="form-row">
                    <label>Phone Number</label>
                    <input className="form-input" id="number" type="" placeholder="07283758294" required
                        value={phoneNumber} onChange={(event) => { setPhoneNumber(event.target.value); }} />
                </div>
                <div className="form-row">
                    <label htmlFor="email">Email Address</label>
                    <input className="form-input" id="email" name="name" type="email" placeholder="jenny.rosen@example.com" required
                        value={email} onChange={(event) => { setEmail(event.target.value); }} />
                </div>
                <div className="card-element-wrapper">
                    <label htmlFor="card-element">Credit or debit card</label>
                    <CardElement className="card-element" options={{
                        style: {
                            base: {
                                backgroundColor: '#f2f2f2',
                                ':focus': {
                                    backgroundColor: '#ff634785',
                                },
                            },
                        },
                    }} onChange={handleChange} />
                    <div className="card-errors" role="alert">{error}</div>
                </div>

                <div className="button-container">
                    <button type="submit" className="submit-button">Submit Payment
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CheckoutForm;