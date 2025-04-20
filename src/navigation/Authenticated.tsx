import AppLayout from "@Layout/AuthLayout/AuthLayout";
import AddEmployee from "@Pages/AppScreens/AddEmployee/AddEmployee";
import AddNewGraph from "@Pages/AppScreens/AddNewGraph";
import AghaahiDashboard from "@Pages/AppScreens/AghaahiDashboard";
import EmployeeView from "@Pages/AppScreens/EmployeeListing";
import PromptChat from "@Pages/AppScreens/PromptChat";
import RequestManagement from "@Pages/AppScreens/RequestManagement";
import useAuthStore from "@Store/authStore";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
    ChangePassword,
    EditProfile,
    UserManagement
} from "./LazyImports";
import { NavigationRoutes } from "./NavigationRoutes";
import ViewEmployeeDetails from "@Pages/AppScreens/AddEmployee/EmployeeDetails/ViewEmployeeDetails";

const DashboardRoutes = [
    {
        title: "PromptChat",
        path: NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT,
        component: <PromptChat />
    },
    {
        title: "PromptChat",
        path: `${NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT}/:id`,
        component: <PromptChat />
    },
    {
        title: "Dashboard",
        path: NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD,
        component: <AghaahiDashboard />
    },
    {
        title: "AddNewGraph",
        path: NavigationRoutes.DASHBOARD_ROUTES.ADD_NEW_GRAPH,
        component: <AddNewGraph />
    },

    {
        title: "AddNewEmployee",
        path: NavigationRoutes.DASHBOARD_ROUTES.ADD_NEW_EMPLOYEE,
        component: <AddEmployee />
    },
    {
        title: "UpdateEmployee",
        path: NavigationRoutes.DASHBOARD_ROUTES.ADD_NEW_EMPLOYEE,
        component: <AddEmployee />
    },
    {
        title: "EmployeeListing",
        path: NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_LISTING,
        component: <EmployeeView />
    },
    {
        title: "EmplpoyeeDetail",
        path: `${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_DETAIL}/:id`,
        component: <ViewEmployeeDetails />
    },
    {
        title: "UdateEmployee",
        path: `${NavigationRoutes.DASHBOARD_ROUTES.UPDATE_EMPLOYEE}/:id`,
        component: <AddEmployee />
    },
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
    const NAVIGATE_TO = true
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
