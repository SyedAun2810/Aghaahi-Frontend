import { CustomButton } from "@Components/Button";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";

import UspsIcon from "@Assets/icons/uspsIcon.svg";
import StripeConnectedCheckIcon from "@Assets/icons/StripeConnectedCheck.svg";

export default function UspsBox({
    handleUspsConnect,
    isUspsConnecting,
    isUspsConnected
}: {
    isUspsConnected: boolean;
    handleUspsConnect: () => void;
    isUspsConnecting: boolean;
}) {
    return (
        <RoundedContainer className={`mt-4 w-[400px] h-[${isUspsConnected ? "155px" : "185px"}] `}>
            <div className="flex items-center">
                <div className="flex items-center ">
                    <div className="relative ">
                        <UspsIcon />
                    </div>
                    <p className="ml-3 font-[600] text-sm text-dark-main">USPS</p>
                </div>
                {isUspsConnected ? (
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

            {!isUspsConnected ? (
                <CustomButton
                    htmlType="button"
                    btnColor={"outlined"}
                    isLoading={isUspsConnecting}
                    onClick={handleUspsConnect}
                    className="w-[100px] h-[30px] px-3 py-0 mt-6 mb-0"
                    title={"Connect"}
                />
            ) : null}
        </RoundedContainer>
    );
}
