import { CustomButton } from "@Components/Button";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";

import StripeIcon from "@Assets/icons/stripeIcon.svg";
import StripeIconS from "@Assets/icons/StripeIconS.svg";
import StripeConnectedCheckIcon from "@Assets/icons/StripeConnectedCheck.svg";

export default function StripeBox({
    isStripeConnected,
    handleStripeConnect,
    isStripeConnecting
}: {
    isStripeConnected: boolean;
    handleStripeConnect: () => void;
    isStripeConnecting: boolean;
}) {
    return (
        <RoundedContainer
            className={`mt-4 w-[400px] h-[${isStripeConnected ? "155px" : "185px"}] `}
        >
            <div className="flex items-center">
                <div className="flex items-center ">
                    <div className="relative ">
                        <StripeIcon />
                        <StripeIconS className="absolute left-[11px] top-[6px]" />
                    </div>
                    <p className="ml-3 font-[600] text-sm text-dark-main">Stripe</p>
                </div>
                {isStripeConnected ? (
                    <div className="flex items-center ml-3">
                        <StripeConnectedCheckIcon />
                        <p className="ml-1 font-[600] text-sm text-[#2CA01C]">Connected</p>
                    </div>
                ) : null}
            </div>
            <div className="mt-1">
                <p className="text-xs">
                    Lorem ipsum dolor sit amet consectetur. Non integer porttitor vel non accumsan
                    diam. Quis ut elit augue eget nunc urna porta. Ut quam mi risus tortor.
                </p>
            </div>

            {!isStripeConnected ? (
                <CustomButton
                    htmlType="button"
                    btnColor={"outlined"}
                    isLoading={isStripeConnecting}
                    onClick={handleStripeConnect}
                    className="w-[100px] h-[30px] px-3 py-0 mt-6 mb-0"
                    title={"Connect"}
                />
            ) : null}
        </RoundedContainer>
    );
}
