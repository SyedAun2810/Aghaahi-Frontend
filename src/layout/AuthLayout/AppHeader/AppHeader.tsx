import { Flex, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { queryClient } from "@Api/Client";
import useAuthStore from "@Store/authStore";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { useAuthLayoutContainer } from "../useAuthLayoutContainer";
import ProfileDropdown from "@Components/ProfileDropdown/ProdileDropdown";
import { arrayOfDashboardItems, CheckRoute } from "@Constants/dashboard.constants";
import UserIcon from "@Assets/icons/userIcon.svg";
import DashboardIcon from "@Assets/icons/DashboardIcon.svg";
import ChatIcon from "@Assets/icons/chatIcon.svg";
import RoleIcon from '@Assets/images/userRole.png';

const AppHeader = ({ chatUnreadMessagesCount }: { chatUnreadMessagesCount: number }) => {
    let { removeUserAuthentication, isOwner, userData } = useAuthStore();
    const { route } = useAuthLayoutContainer();
    const role = userData?.role?.name;
    const navigate = useNavigate();

    const handleLogout = () => {
        queryClient.clear();
        removeUserAuthentication();
    };

    const dashboardItems: MenuProps['items'] = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            onClick: () => navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD)
        },
        {
            key: 'graphLibrary',
            label: 'Graph Library',
            onClick: () => navigate(NavigationRoutes.DASHBOARD_ROUTES.ADD_NEW_GRAPH)
        }
    ];

    const userManagementItems: MenuProps['items'] = [
        {
            key: 'users',
            label: 'Users',
            onClick: () => navigate(NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_LISTING)
        },
        {
            key: 'addUser',
            label: 'Add User',
            onClick: () => navigate(NavigationRoutes.DASHBOARD_ROUTES.ADD_NEW_EMPLOYEE)
        },
        {
            key: 'roleManagement',
            label: 'Role Management',
            onClick: () => navigate(NavigationRoutes.DASHBOARD_ROUTES.ROLE_MANAGEMENT)
        }
    ];

    return (
        <Flex align="center" className="w-full justify-between pr-8 ">
            {/* Left Section: Role */}
            <div className="flex items-center gap-2 ml-12">
                <p className="text-lg text-[#5950CB]">{userData?.company?.name} - {role}</p>
            </div>

            {/* Right Section: All Navigation Items */}
            <div className="flex items-center gap-2">
                <Dropdown menu={{ items: dashboardItems }} placement="bottom" arrow overlayClassName="top-[60px]">
                    <div className="flex items-center cursor-pointer">
                        <DashboardIcon />
                        <p className="ml-2 mr-4 text-md">Customize Dashboard</p>
                    </div>
                </Dropdown>

                <ChatIcon />
                <p
                    className="mr-4 cursor-pointer text-md"
                    onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT)}
                >
                    Agaahi Chat
                </p>

                <Dropdown menu={{ items: userManagementItems }} placement="bottom" arrow overlayClassName="top-[60px]">
                    <div className="flex items-center cursor-pointer">
                        <UserIcon />
                        <p className="ml-2 mr-4 text-md">Manage Users</p>
                    </div>
                </Dropdown>

                <ProfileDropdown logout={handleLogout} />
            </div>
        </Flex>
    );
};

export default AppHeader;
