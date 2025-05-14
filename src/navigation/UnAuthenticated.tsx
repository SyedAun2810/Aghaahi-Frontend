import { Navigate, Route, Routes } from "react-router-dom";
import useAuthStore from "@Store/authStore";

import Otp from "@Pages/AuthScreens/Otp/Otp";
import Login from "@Pages/AuthScreens/Login/Login";
import { NavigationRoutes } from "./NavigationRoutes";
import SignUp from "@Pages/AuthScreens/SignUp/SignUp";
import AuthLayout from "@Layout/UnAuthLayout/UnAuthLayout";
import ForgotPassword from "@Pages/AuthScreens/ForgotPassword/ForgotPassword";
import ResetPassword from "@Pages/AuthScreens/ResetPassword/ResetPassword";
import RegisterDatabase from "@Pages/AuthScreens/RegisterDatabase/index";
import LandingPage from "@Pages/AuthScreens/LandingPage";
import ContactUsPage from "@Pages/AuthScreens/ContactUs";
import PrivacyPolicy from "@Pages/AuthScreens/PrivacyPolicy";
import Pricing from "@Pages/AuthScreens/Pricing";
import ConnectionString from "@Pages/AuthScreens/ConnectionString";
import AboutUs from "@Pages/AuthScreens/AboutUs";
import FAQ from "@Pages/AuthScreens/FAQ";

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
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.VALIDATE_DATABASE,
        component: RegisterDatabase
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.LANDING_PAGE,
        component: LandingPage
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.CONTACT_US,
        component: ContactUsPage
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.PRIVACY_POLICY,
        component: PrivacyPolicy
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.PRICING,
        component: Pricing
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.ABOUT_US,
        component: AboutUs
    },
    {
        path: NavigationRoutes.AUTH_ROUTES.FAQ,
        component: FAQ
    },
];

const UnAuthenticated = () => {
    const { isDark } = useAuthStore();
    
    return (
        <div className={`min-h-screen ${isDark ? 'dark:bg-gray-900 dark:text-white' : 'bg-white text-gray-900'}`}>
            <Routes>
                <Route path={NavigationRoutes.AUTH_ROUTES.INDEX} element={<AuthLayout />}>
                    <Route
                        path={NavigationRoutes.AUTH_ROUTES.INDEX}
                        element={<Navigate to={NavigationRoutes.AUTH_ROUTES.ABOUT_US} />}
                    />
                    {RouteList.map(({ path, component: Component }, index) => (
                        <Route key={index} path={path} element={<Component />} />
                    ))}
                </Route>
                <Route path="*" element={<Navigate to={NavigationRoutes.AUTH_ROUTES.ABOUT_US} />} />
            </Routes>
        </div>
    );
};

export default UnAuthenticated;
