import { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentProcess from "./PaymentProcess";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY); // stripe publishable key

type CheckoutFormTypes = {
    clientSecret: string;
    onFinish: (paymentData: any) => void;
};

export default function CheckoutForm({ onFinish, clientSecret }: CheckoutFormTypes) {
    const [initializing, setInitializing] = useState(true);
    const onReady = () => {
        setInitializing(false);
    };
    const options = useMemo(() => {
        return {
            clientSecret
        };
    }, [clientSecret]);
    return (
        <div
            style={{
                padding: 18
            }}
        >
            <h2 style={{ marginBottom: "15px" }}>Stripe Payment</h2>
            {initializing && (
                <div>
                    <ProgressLoader />
                </div>
            )}
            <Elements stripe={stripePromise} options={options}>
                <PaymentProcess onReady={onReady} onFinish={onFinish} />
            </Elements>
        </div>
    );
}
