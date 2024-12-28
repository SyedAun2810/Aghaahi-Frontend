import { Navigate, Route, Routes } from "react-router-dom";

import Otp from "@Pages/AuthScreens/Otp/Otp";
import Login from "@Pages/AuthScreens/Login/Login";
import { NavigationRoutes } from "./NavigationRoutes";
import SignUp from "@Pages/AuthScreens/SignUp/SignUp";
import AuthLayout from "@Layout/UnAuthLayout/UnAuthLayout";
import ForgotPassword from "@Pages/AuthScreens/ForgotPassword/ForgotPassword";
import ResetPassword from "@Pages/AuthScreens/ResetPassword/ResetPassword";
const RouteList = [
    {
        path: NavigationRoutes.AUTH_ROUTES.LOGIN,
        component: Login
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.REGISTER,
        component: SignUp
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.FORGOT_PASSWORD,
        component: ForgotPassword
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.RESET_PASSWORD,
        component: ResetPassword
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.VERIFY_EMAIL,
        component: Otp
    }
];

const UnAuthenticated = () => {

    return (
        <Routes>
            <Route path={NavigationRoutes.AUTH_ROUTES.INDEX} element={<AuthLayout />}>
                <Route
                    path={NavigationRoutes.AUTH_ROUTES.INDEX}
                    element={<Navigate to={NavigationRoutes.AUTH_ROUTES.LOGIN} />}
                />
                {RouteList.map(({ path, component: Component }, index) => (
                    <Route key={index} path={path} element={<Component />} />
                ))}
            </Route>
            <Route path="*" element={<Navigate to={NavigationRoutes.AUTH_ROUTES.LOGIN} />} />
        </Routes>
    );
};

export default UnAuthenticated;
