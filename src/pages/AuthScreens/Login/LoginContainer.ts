import {Form} from "antd"
import { useNavigate } from "react-router-dom"

import useAuthStore from "@Store/authStore";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { useLogin } from "./LoginQuery";
import { FROM_SCREEN, USER_ROLE } from "@Constants/app";
import { loginPayload } from "@Utils/types";
import { queryClient } from "@Api/Client";

export default function useLoginContainer(){

    const [form] = Form.useForm()
    const navigate = useNavigate();
    const { setUserAuthentication } = useAuthStore();

    const onLoginSuccess = (data: any) => {
        setUserAuthentication(data?.data);
        queryClient.invalidateQueries({ queryKey: ["USER_DETAIL"] });
        navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD);
      };
    
    const onVerificationFail = (email :string) => {
        navigate(NavigationRoutes.AUTH_ROUTES.VERIFY_EMAIL, {
            state: { from: FROM_SCREEN.LOGIN, email: email },
          });
    }   

    const { mutate: loginMutate, isLoading: isLoggingIn } = useLogin({
        onSuccess: onLoginSuccess,
        onVerificationFail: onVerificationFail
    });


    const handleSubmit = (data:any) =>{
        data.DeviceId = "any";
        data.role = USER_ROLE;
        loginMutate(data);
    }
    const handleSignUp = () =>{
        navigate(NavigationRoutes.AUTH_ROUTES.REGISTER)
    }

    const handleForgotPassword= () =>{
        navigate(NavigationRoutes.AUTH_ROUTES.FORGOT_PASSWORD)
    }
    return{
        form,
        handleSubmit,
        handleSignUp,
        handleForgotPassword,
        isLoggingIn
    } 
} 