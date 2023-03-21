import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { API_BASE } from "../api";

const CheckoutForm = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [basket, setBasket] = useState([]);
    const [price, setPrice] = useState(0);
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
        const card = elements.getElement(CardElement);

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

        fetch(`${API_BASE}/payments/test-intent/`, {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((resp) => resp.json())
            .then((json) => console.log(json))
            .catch((err) => console.error(err));
    }

    return (
        <>
            <div className="order">
                <h1 className="checkout-basket-header">Your Order</h1>
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
                            <tr key={index} className="basket-item">
                                <td>{item.dish.name}</td>
                                <td>
                                    <span className="item-quantity">{item.quantity}</span>
                                </td>
                                <td className="price-container">£{(item.dish.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="price">
                <p>Total Price</p>
                <p>{price}</p>
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
                <div className="form-row">
                    <label htmlFor="card-element">Credit or debit card</label>
                    <CardElement id="card-element" onChange={handleChange} />
                    <div className="card-errors" role="alert">{error}</div>
                </div>

                <button type="submit" className="submit-btn">
                    Submit Payment
                </button>
            </form></>
    );
};

export default CheckoutForm;