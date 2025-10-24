import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('pk_test_your_publishable_key_here');

export const OPD_ROOMS = [1, 2, 3, 4, 5];
export const APPOINTMENT_PRICE = 5000; // $50.00 in cents