import { Flex } from "antd";
import { queryClient } from "@Api/Client";
import useAuthStore from "@Store/authStore";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "@Components/ProfileDropdown/ProdileDropdown";

const AppHeader = ({ chatUnreadMessagesCount }: { chatUnreadMessagesCount: number }) => {
    const { removeUserAuthentication } = useAuthStore();

    const navigate = useNavigate();
    const handleLogout = () => {
        queryClient.clear();
        removeUserAuthentication();
    };
    return (
        <Flex align="center" gap={12} className="mr-8 ">
            <ProfileDropdown logout={handleLogout} />
        </Flex>
    );
};

export default AppHeader;
