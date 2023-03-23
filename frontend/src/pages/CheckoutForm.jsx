import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_BASE } from "../api";
import { Link } from 'react-router-dom';
import "../styling/Checkout.css"

const CheckoutForm = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [basket, setBasket] = useState([]);
    const [price, setPrice] = useState(0);
    const [tableNum, setTableNum] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
        const calculatedPrice = storedBasket.reduce(
            (acc, item) => acc + item.dish.price * item.quantity,
            0
        );
        setPrice(calculatedPrice);
        setBasket(storedBasket);

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

        if (tableNum === 0) {
            setTableNum(Math.floor(Math.random() * 40) + 1);
        } else {
            fetchOrders();
        }
    }, []);

    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.removeItem('basket');
        const card = elements.getElement(CardElement);
        const access_token = localStorage.getItem('access_token');

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        });

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

        const dishes = [];

        basket.forEach(item => {
            const dish = item.dish.id;
            dishes.push(dish);
        });

        console.log(dishes)
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false, timeZone: 'Europe/London' });

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

        try {
            const response = await axios(orderConfig);
            console.log(response.data);
            orderId = response.data.id;
        } catch (error) {
            console.error(error);
        }

        const orderDishes = basket.map((item) => {
            return {
                order: orderId,
                dish: item.dish.id,
                quantity: item.quantity,
            };
        });

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