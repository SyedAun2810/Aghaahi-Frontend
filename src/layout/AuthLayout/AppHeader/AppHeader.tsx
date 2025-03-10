import { Flex } from "antd";
import { queryClient } from "@Api/Client";
import useAuthStore from "@Store/authStore";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { useAuthLayoutContainer } from "../useAuthLayoutContainer";
import ProfileDropdown from "@Components/ProfileDropdown/ProdileDropdown";
import { arrayOfDashboardItems } from "@Constants/dashboard.constants";

const AppHeader = ({ chatUnreadMessagesCount }: { chatUnreadMessagesCount: number }) => {
    const { removeUserAuthentication } = useAuthStore();
    const { route } = useAuthLayoutContainer();

    let isDashboard = arrayOfDashboardItems.includes(route[1]);
    let isAddNewGraph = route[1] === "add-new-graph";
    const navigate = useNavigate();

    const handleLogout = () => {
        queryClient.clear();
        removeUserAuthentication();
    };

    return (
        <Flex align="center" gap={12} className="mr-8 ">
            {!isDashboard ? (
                <p
                    className="mr-4 cursor-pointer "
                    onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD)}
                >
                    Dashboard
                </p>
            ) : (
                <>
                    <p
                        className="mr-4 cursor-pointer "
                        onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT)}
                    >
                        Go to Chat
                    </p>
                    {isAddNewGraph ? (
                        <p
                            className="mr-4 cursor-pointer "
                            onClick={() =>
                                navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD)
                            }
                        >
                            Go to Dashboard
                        </p>
                    ) : (
                        <p
                            className="mr-4 cursor-pointer "
                            onClick={() =>
                                navigate(NavigationRoutes.DASHBOARD_ROUTES.ADD_NEW_GRAPH)
                            }
                        >
                            Add New Graph
                        </p>
                    )}
                </>
            )}
            <ProfileDropdown logout={handleLogout} />
        </Flex>
    );
};

export default AppHeader;
