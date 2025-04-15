import { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

function useStripe() {
    const [stripe, setStripe] = useState<Stripe | null>(null);

    useEffect(() => {
        async function loadStripeAsync() {
            const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);
            setStripe(stripeInstance);
        }

        loadStripeAsync();
    }, []);



    async function createPaymentStripeCheckout(checkoutData: any) {
        if (!stripe) {
            console.error('Stripe not loaded');
            return;
        }

        try {
            const response = await fetch('/api/stripe/create-pay-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutData),
            });

            const data = await response.json();

            await stripe.redirectToCheckout({ sessionId: data.id, });

        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    }

async function createSubscriptionStripeCheckout(checkoutData: any) {
        if (!stripe) {
            console.error('Stripe not loaded');
            return;
        }

        try {
            const response = await fetch('/api/stripe/create-subscription-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutData),
            });

            const data = await response.json();

            await stripe.redirectToCheckout({ sessionId: data.id, });

        } catch (error) {
            console.error('Error creating subscription checkout session:', error);
        }
    }




    return { createPaymentStripeCheckout,
        createSubscriptionStripeCheckout
     };
}

export default useStripe;
