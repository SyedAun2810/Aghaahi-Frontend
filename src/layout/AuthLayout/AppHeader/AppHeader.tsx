import { Flex } from "antd";
import { queryClient } from "@Api/Client";
import useAuthStore from "@Store/authStore";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { useAuthLayoutContainer } from "../useAuthLayoutContainer";
import ProfileDropdown from "@Components/ProfileDropdown/ProdileDropdown";
import { arrayOfDashboardItems, CheckRoute } from "@Constants/dashboard.constants";
import UserIcon from "@Assets/icons/userIcon.svg";
import DashboardIcon from "@Assets/icons/DashboardIcon.svg"; // Already imported
import ChatIcon from "@Assets/icons/chatIcon.svg"; // Already imported
import RoleIcon from '@Assets/images/userRole.png';

const AppHeader = ({ chatUnreadMessagesCount }: { chatUnreadMessagesCount: number }) => {
    let { removeUserAuthentication, isOwner, userData } = useAuthStore();
    const { route } = useAuthLayoutContainer();
    const role = userData?.role?.name // Default to "Owner" if role is not defined
    //console.log(role)

    let isDashboard = CheckRoute(route);
    let isEmployeeSection = route[1] === "add-new-employee";
    let isEmployeeListing = route[1] === "employee-listing";

    let isAddNewGraph = route[1] === "add-new-graph";
    const navigate = useNavigate();

    const handleLogout = () => {
        queryClient.clear();
        removeUserAuthentication();
    };

    isOwner = true;

    return (
        <Flex align="center" className="w-full justify-between pr-8 shadow-lg shadow-gray-500/50">
            {/* Left Section: Role */}
            <div className="flex items-center gap-2 ml-12">
                <p className="text-lg text-[#5950CB]">{userData?.company?.name} - {role}</p>
            </div>

            {/* Right Section: Rest of the Content */}
            <div className="flex items-center gap-2">
                {!isDashboard ? (
                    <>
                        <DashboardIcon />
                        <p
                            className="mr-4 cursor-pointer text-md"
                            onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD)}
                        >
                            Dashboard
                        </p>
                    </>
                ) : (
                    <>
                        <ChatIcon />
                        <p
                            className="mr-4 cursor-pointer text-md"
                            onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT)}
                        >
                            Go to Chat
                        </p>
                        {isAddNewGraph ? (
                            <>
                                <DashboardIcon />
                                <p
                                    className="mr-4 cursor-pointer text-md"
                                    onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD)}
                                >
                                    Go to Dashboard
                                </p>
                            </>
                        ) : (
                            <>
                                <DashboardIcon />
                                <p
                                    className="mr-4 cursor-pointer text-md"
                                    onClick={() =>
                                        navigate(NavigationRoutes.DASHBOARD_ROUTES.ADD_NEW_GRAPH)
                                    }
                                >
                                    Add New Graph
                                </p>
                            </>
                        )}
                    </>
                )}
                {!isDashboard && isOwner && role === "Owner" && (
                    <>
                        <UserIcon />
                        <p
                            className="mr-4 cursor-pointer text-md"
                            onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_LISTING)}
                        >
                            User Management
                        </p>
                    </>
                )}
                {isEmployeeListing && isOwner && (
                    <>
                        <UserIcon />
                        <p
                            className="mr-4 cursor-pointer text-md"
                            onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.ADD_NEW_EMPLOYEE)}
                        >
                            Add Employee
                        </p>
                        <img src={RoleIcon} alt="" />
                        <p
                            className="mr-4 cursor-pointer text-md"
                            onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.ROLE_MANAGEMENT)}
                        >
                            Role Management
                        </p>
                    </>
                )}
                <ProfileDropdown logout={handleLogout} />
            </div>
        </Flex>
    );
};

export default AppHeader;
