import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import '../styling/StripeApp.css';

const stripePromise = loadStripe('pk_test_51Mm1OUGHCVd3YY0Z0qddQGTs0mndGS26E7ooPejSxkUGOxgPQs0BBF6pz5V5Oxf9gcJlP4vphcyhpPxqAtqQqkyd00QO4WujFi');

const Checkout = () => (
    <div className="stripe-payment">
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    </div>
)

export default Checkout;