import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import utilService from "@Utils/utils.service";
import { forgotPasswordPayload } from "@Utils/types";
import { ResendOtpPayload } from "@Pages/AuthScreens/types";
import { useResendOtp } from "@Pages/AuthScreens/Otp/OtpQuery";
import { useForgotPassword } from "@Pages/AuthScreens/ForgotPassword/ForgotPasswordQuery";

export const resendTimerDuration = 59;

const useTimer = (email: string, fromScreen: number) => {
    const [timer, setTimer] = useState(resendTimerDuration);
    const [expired, setExpired] = useState(false);

    const resetTimer = useCallback(() => {
        setExpired(false);
        setTimer(resendTimerDuration);
    }, []);

    const { mutate: resendOtp, isLoading:isResendingVerificationOtp } = useResendOtp(resetTimer);

    const { mutate: forgotPasswordMutate, isLoading:isResendingForgotOtp } = useForgotPassword(
        (data: forgotPasswordPayload) => {
            resetTimer();
        }
    );

    const handleResendOtp = useCallback(() => {
        const payload = { email };
        if (utilService.findPreviousScreen(fromScreen)) {
            resendOtp(payload);
        } else {
            forgotPasswordMutate(payload);
        }
    }, [email, fromScreen, resendOtp, forgotPasswordMutate]);

    useEffect(() => {
        if (timer <= 0) {
            setExpired(true);
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return {
        timer,
        expired,
        setExpired,
        setTimer,
        resendTimer: resendTimerDuration,
        handleResendOtp,
        isResendingVerificationOtp,
        isResendingForgotOtp,
    };
};

export default useTimer;
