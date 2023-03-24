import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import '../styling/Checkout.css';

/**
 * @author Katerina Sofroniou
 */

/**
 * A promise that loads the Stripe API with the provided public key.
 * @type {Promise<Stripe | null>}
 */
const stripePromise = loadStripe('pk_test_51Mm1OUGHCVd3YY0Z0qddQGTs0mndGS26E7ooPejSxkUGOxgPQs0BBF6pz5V5Oxf9gcJlP4vphcyhpPxqAtqQqkyd00QO4WujFi');

/**
 * A React functional component that wraps a Stripe checkout form with the Stripe Elements provider.
 * @returns {JSX.Element} The rendered React component.
 */
const Checkout = () => (
    <div className="stripe-payment">
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    </div>
)

export default Checkout;