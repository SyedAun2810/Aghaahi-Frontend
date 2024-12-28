import { Form } from "antd";
import { useNavigate } from "react-router-dom";

import { FROM_SCREEN } from "@Constants/app";
import { forgotPasswordPayload } from "../types";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { useForgotPassword } from "./ForgotPasswordQuery";

export default function useForgotPasswordContainer() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onForgotPasswordSuccess = (payload: forgotPasswordPayload) => {
        navigate(NavigationRoutes.AUTH_ROUTES.VERIFY_EMAIL, {
            state: { from: FROM_SCREEN.FORGOT_PASSWORD, email: payload?.email }
        });
    };

    const { mutate: forgotPasswordMutate, isLoading } = useForgotPassword(onForgotPasswordSuccess);

    const handleSubmit = (data: forgotPasswordPayload) => {
        forgotPasswordMutate(data);
    };

    const handleLogin = () => {
        navigate(NavigationRoutes.AUTH_ROUTES.LOGIN);
    };

    const handleForgotPassword = () => {};
    return {
        form,
        isLoading,
        handleSubmit,
        handleLogin,
        handleForgotPassword
    };
}
