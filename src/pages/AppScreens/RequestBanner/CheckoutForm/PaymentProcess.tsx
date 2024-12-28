import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CustomButton } from "@Components/Button";

const PaymentProcess = (props) => {
    const { onReady, onFinish } = props;
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setLoading(true);
        const paymentResult = await stripe.confirmSetup({
            elements,
            redirect: "if_required",
            confirmParams: {
                return_url: `${import.meta.env.VITE_APP_BASE_URL}`
            }
        });
        if (paymentResult?.error) {
            setErrorMessage(paymentResult?.error?.message);
            setLoading(false);
        } else {
            onFinish(paymentResult?.setupIntent?.payment_method);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement onReady={onReady} onChange={() => setErrorMessage(null)} />
            {errorMessage && (
                <span>
                    <p style={{ color: "#ff0000" }}>{errorMessage}</p>
                </span>
            )}
            <div>
                <CustomButton
                    disabled={!stripe}
                    title="Confirm"
                    htmlType="submit"
                    isLoading={loading}
                />
            </div>
        </form>
    );
};

export default PaymentProcess;
