import { Button } from "antd";
import useTimer, { resendTimer } from "./timerContainer";
import ColoredText from "@Components/ColorText/ColorText";

type otpTimerType = {
    email?: string;
    newToken?: string;
    setNewToken?: (token: string) => void;
    fromScreen: number;
};

const OtpTimer: React.FC<otpTimerType> = ({ email = "", newToken, fromScreen, setNewToken }) => {
    const { timer, expired, handleResendOtp, isResendingVerificationOtp, isResendingForgotOtp } =
        useTimer(email, fromScreen);

    return (
        <>
            {!expired ? (
                <p className="text-center text-#202224 text-large font-[500]">
                    Resend request in <ColoredText text={timer} />
                    &nbsp;seconds{" "}
                </p>
            ) : (
                <div className="flex justify-center">
                    <button
                        className="border-none  bg-transparent"
                        disabled={isResendingForgotOtp || isResendingVerificationOtp}
                    >
                        <ColoredText
                            text={"Resend OTP"}
                            className="cursor-pointer disabled"
                            onClick={handleResendOtp}
                        />
                    </button>
                </div>
            )}
        </>
    );
};

export default OtpTimer;
