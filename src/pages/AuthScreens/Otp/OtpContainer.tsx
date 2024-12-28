import { FROM_SCREEN } from "@Constants/app";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResendOtp, useResetPassOtp, useVerifyUserOtp } from "./OtpQuery";
import { OtpResetPayload, ResendOtpPayload } from "../types";
import utilService from "@Utils/utils.service";
import useAuthStore from "@Store/authStore";

export default function useOtpContainer() {
    const [otp, setOTP] = useState<string[]>(new Array(4).fill(""));
    const location = useLocation();

    const { setUserAuthentication } = useAuthStore();
    let { from: fromScreen, email } = location.state;

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onResetPassOtpSuccess = (data: any, payload: OtpResetPayload) => {
        navigate(NavigationRoutes.AUTH_ROUTES.RESET_PASSWORD, {
            state: { token: data.data, email: payload?.email }
        });
    };

    const onVerifyUserOtpSuccess = (data: any, payload: OtpResetPayload) => {
        setUserAuthentication(data?.data);
        navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD);
    };

    const { mutate: resetPasswordOtp, isLoading: isLoadingResetPassOtp } =
        useResetPassOtp(onResetPassOtpSuccess);

    const { mutate: verifyUserOtp, isLoading: isVerifyingUser } =
        useVerifyUserOtp(onVerifyUserOtpSuccess);

    const { mutate: resendOtp, isResendingOtp } = useResendOtp(()=>{});

    const handleSubmit = () => {
        const code = otp.join("");
        const resetPassOtppayload = { code: code, email: email };
        const verifyUserOtpPayload = { code: code, deviceId: "abcd123", email: email };

        utilService.findPreviousScreen(fromScreen)
            ? verifyUserOtp(verifyUserOtpPayload)
            : resetPasswordOtp(resetPassOtppayload);
    };
    const handleSignUp = () => {
        navigate(NavigationRoutes.AUTH_ROUTES.REGISTER);
    };

    const handleForgotPassword = () => {
        navigate(NavigationRoutes.AUTH_ROUTES.FORGOT_PASSWORD);
    };

    const validateOTP = async () => {
        if (otp.join("").length < 4) {
            return Promise.reject(new Error("OTP must be 4 characters long"));
        }
        return Promise.resolve();
    };

    useEffect(() => {
        if(fromScreen == FROM_SCREEN.LOGIN){
            resendOtp({email});
        }
    }, []);

    return {
        otp,
        email,
        setOTP,
        form,
        handleSubmit,
        handleSignUp,
        handleForgotPassword,
        validateOTP,
        fromScreen,
        isLoadingResetPassOtp,
        isVerifyingUser
    };
}
