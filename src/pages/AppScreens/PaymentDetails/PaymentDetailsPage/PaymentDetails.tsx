import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";

import usePaymentDetails from "./usePaymentDetails";
import StripeBox from "../Components/StripeBox";
import UspsBox from "../Components/UspsBox";

const PaymentDetails = () => {
    const {
        isUspsConnected,
        isUspsConnecting,
        isStripeConnected,
        handleUspsConnect,
        isStripeConnecting,
        handleStripeConnect
    } = usePaymentDetails();
    return (
        <>
            <RoundedContainer>
                <h1 className="font-[500] text-xxl text-dark-main border-bottom h-[56px]">
                    Payment Details
                </h1>
            </RoundedContainer>
            <div className="flex gap-2">
                <StripeBox
                    isStripeConnected={isStripeConnected}
                    isStripeConnecting={isStripeConnecting}
                    handleStripeConnect={handleStripeConnect}
                />
                <UspsBox
                    isUspsConnected={isUspsConnected}
                    isUspsConnecting={isUspsConnecting}
                    handleUspsConnect={handleUspsConnect}
                />
            </div>
        </>
    );
};

export default PaymentDetails;
