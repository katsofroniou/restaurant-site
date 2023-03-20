import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { API_BASE } from "../api";

const CheckoutForm = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();

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

        fetch(`${API_BASE}/payments/test-intent/`, {method: "POST", body: JSON.stringify({email, payment_method_id: paymentMethod.id})})
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }

    return (
        <form onSubmit={handleSubmit} className="stripe-form">
            <div className="form-row">
                <label htmlFor="email">Email Address</label>
                <input className="form-input" id="email" name="name" type="email" placeholder="jenny.rosen@example.com" required
                    value={email} onChange={(event) => { setEmail(event.target.value) }} />
            </div>
            <div className="form-row">
                <label for="card-element">Credit or debit card</label>
                <CardElement id="card-element" onChange={handleChange} />
                <div className="card-errors" role="alert">{error}</div>
            </div>
            <button type="submit" className="submit-btn">
                Submit Payment
            </button>
        </form>
    );
};

export default CheckoutForm;