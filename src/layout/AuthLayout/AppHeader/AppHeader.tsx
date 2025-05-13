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
    const { removeUserAuthentication, isOwner, userData } = useAuthStore();
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
        <Flex align="center" className="w-full justify-between pr-8 bg-white dark:bg-[#212121]">
            {/* Left Section: Role */}
            <div className="flex items-center gap-2 ml-12">
                <p className="text-lg text-[#5950CB] dark:text-white">{userData?.company?.name} - {role}</p>
            </div>

            {/* Right Section: All Navigation Items */}
            <div className="flex items-center gap-4">
                <Dropdown menu={{ items: dashboardItems }} placement="bottom" arrow overlayClassName="top-[60px] dark:bg-[#212121] dark:text-white [&_.ant-dropdown-arrow]:dark:border-t-[#212121] [&_.ant-dropdown-arrow]:dark:border-l-[#212121]">
                    <div className="flex items-center justify-center cursor-pointer hover:text-[#5950CB] dark:hover:text-purple-400 transition-colors duration-200">
                        <div className="flex items-center justify-center dark:brightness-0 dark:invert">
                            <DashboardIcon />
                        </div>
                        <p className="ml-2 mr-4 text-md dark:text-gray-200">Customize Dashboard</p>
                    </div>
                </Dropdown>

                <div className="flex items-center justify-center cursor-pointer hover:text-[#5950CB] dark:hover:text-purple-400 transition-colors duration-200">
                    <div className="flex items-center justify-center dark:brightness-0 dark:invert">
                        <ChatIcon />
                    </div>
                    <p
                        className="mr-4 text-md dark:text-gray-200 ml-2"
                        onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT)}
                    >
                        Agaahi Chat
                    </p>
                </div>

                <Dropdown menu={{ items: userManagementItems }} placement="bottom" arrow overlayClassName="top-[60px] dark:bg-[#212121] dark:text-white [&_.ant-dropdown-arrow]:dark:border-t-[#212121] [&_.ant-dropdown-arrow]:dark:border-l-[#212121]">
                    <div className="flex items-center justify-center cursor-pointer hover:text-[#5950CB] dark:hover:text-purple-400 transition-colors duration-200">
                        <div className="flex items-center justify-center dark:brightness-0 dark:invert">
                            <UserIcon />
                        </div>
                        <p className="ml-2 mr-4 text-md dark:text-gray-200">Manage Users</p>
                    </div>
                </Dropdown>

                <ProfileDropdown logout={handleLogout} />
            </div>
        </Flex>
    );
};

export default AppHeader;
