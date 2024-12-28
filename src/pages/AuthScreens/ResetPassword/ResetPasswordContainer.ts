import {Form} from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { useResetPassword } from "./ResetPasswordQuery";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { ResetPasswordPayload } from "../types";

export default function useResetPasswordContainer(){

    const [form] = Form.useForm()
    const navigate = useNavigate();
    const location = useLocation();
    const { token, email } = location.state;
    
    const onResetPassSuccess = (payload: ResetPasswordPayload) => {
        navigate(NavigationRoutes.AUTH_ROUTES.LOGIN)
    };

    const { mutate: resetPassword, isLoading:isResettingPassword } = useResetPassword(onResetPassSuccess);

    const handleSubmit = (data:any) =>{
        resetPassword({
            email,
            token,
            password: data.newPassword
        })
    }
    const handleLogin = () =>{
        navigate(NavigationRoutes.AUTH_ROUTES.LOGIN)
    }

    return{
        form,
        handleSubmit,
        handleLogin,
        isResettingPassword
    }
}