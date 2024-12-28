import { Navigate, Route, Routes } from "react-router-dom";
import { NavigationRoutes } from "./NavigationRoutes";
import useAuthStore from "@Store/authStore";
import AppLayout from "@Layout/AuthLayout/AuthLayout";
import {
    Chat,
    Dashboard,
    OrderDetails,
    OrderManagement,
    PaymentDetails,
    MyEarnings,
    ProductManagement,
    ProductDetails,
    AddProduct,
    UserManagement,
    RequestBanner,
    ChangePassword,
    EditProfile,
    BannerManagementDetails,
    GenerateLabels
} from "./LazyImports";
import { useEffect } from "react";
import RequestManagement from "@Pages/AppScreens/RequestManagement";
import PromptChat from "@Pages/AppScreens/PromptChat";

const DashboardRoutes = [
    // {
    //     title: "Dashboard",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD,
    //     component: <Dashboard />
    // },
    // {
    //     title: "MyEarnings",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.MY_EARNINGGS,
    //     component: <MyEarnings />
    // },
    {
        title: "Chat",
        path: NavigationRoutes.DASHBOARD_ROUTES.CHAT,
        component: <Chat />
    },
    {
        title: "ChatDetails",
        path: NavigationRoutes.DASHBOARD_ROUTES.CHAT_DETAILS,
        component: <Chat />
    },
    {
        title: "PromptChat",
        path: NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT,
        component: <PromptChat />
    },
    // {
    //     title: "OrderManagement",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT,
    //     component: <OrderManagement />
    // },
    // {
    //     title: "OrderDetails",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.ORDER_DETAILS,
    //     component: <OrderDetails />
    // },
    // {
    //     title: "GenerateLabels",
    //     path: `${NavigationRoutes.DASHBOARD_ROUTES.GENERATE_LABELS_MAIN}/:id`,
    //     component: <GenerateLabels />
    // },
    // {
    //     title: "PaymentDetails",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.PAYMENT_DETAILS,
    //     component: <PaymentDetails />
    // },
    // {
    //     title: "ProductManagement",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_MANAGEMENT,
    //     component: <ProductManagement />
    // },
    // {
    //     title: "ProductDetails",
    //     path: `${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_DETAILS}/:id`,
    //     component: <ProductDetails />
    // },
    // {
    //     title: "AddProduct",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.ADD_PRODUCT,
    //     component: <AddProduct />
    // },
    // {
    //     title: "ProductEdit",
    //     path: `${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_EDIT}/:id`,
    //     component: <AddProduct />
    // },
    {
        title: "UserManagement",
        path: NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT,
        component: <UserManagement />
    },
    {
        title: "RequestManagement",
        path: NavigationRoutes.DASHBOARD_ROUTES.REQUEST_MANAGEMENT,
        component: <RequestManagement/>
    },
    // {
    //     title: "BannerDetails",
    //     path: `${NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT_DETAILS}/:id`,
    //     component: <BannerManagementDetails />
    // },
    // {
    //     title: "RequestBanner",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.REQUEST_BANNER,
    //     component: <RequestBanner />
    // },
    {
        title: "ChangePassword",
        path: NavigationRoutes.DASHBOARD_ROUTES.CHANGE_PASSWORD,
        component: <ChangePassword />
    },
    {
        title: "EditProfile",
        path: NavigationRoutes.DASHBOARD_ROUTES.EDIT_PROFILE,
        component: <EditProfile />
    }
];

const Authenticated = () => {
    const { isAuth } = useAuthStore();
    const NAVIGATE_TO = isAuth
        ? NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT
        : NavigationRoutes.AUTH_ROUTES.LOGIN;

    useEffect(() => {
        document.title = "User-Management - Admin-Aghaahi";
    }, []);

    return (
        <Routes>
            <Route element={<AppLayout />}>
                {DashboardRoutes.map(({ path, component }, index) => {
                    return <Route key={index} path={path} element={component} />;
                })}
            </Route>
            <Route path="*" element={<Navigate to={NAVIGATE_TO} />} />
        </Routes>
    );
};

export default Authenticated;
