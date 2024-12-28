import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useTableRequestFilters from "@Hooks/useFetchTableFilters";
import { useChatUserListing } from "./Queries/ChatUserListing";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import utilService from "@Utils/utils.service";
import { queryClient } from "@Api/Client";

const smallScreenWidth = 768;
const useChatContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [chatId, setChatId] = useState<number | undefined>(id ? Number(id) : undefined);
    const [showUserList, setShowUserList] = useState(true);
    const [selectedUserInfo, setSelectedUserInfo] = useState(undefined);
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    // for closing the side drawer (chat listing) on variable screen size
    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };
        queryClient.invalidateQueries({ queryKey: ["CHAT"] });
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // chat user listing filters
    const { onSearch, filtersData } = useTableRequestFilters({
        SearchBy: "",
        pageSize: 10
    });

    // fetching chat user listing
    const { data, ...meta } = useChatUserListing(filtersData, {
        select: utilService.chatNormalizeInfiniteQuery
    });

    function selectChatHandler(user: any) {
        setChatId(user?.id);
        setSelectedUserInfo(user);
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.CHAT}/${user?.id}`);
    }

    // handle back Icon Click
    const BackIconClickHandler = () => {
        setShowUserList(!showUserList);
    };

    const isMobileScreen = screenSize < smallScreenWidth;
    const hasSmallerScreenAndShowListing = isMobileScreen && showUserList;
    return {
        id,
        chatId,
        onSearch,
        isMobileScreen,
        selectedUserInfo,
        chatListing: data || [],
        selectChatHandler,
        BackIconClickHandler,
        chatListingMeta: meta,
        hasSmallerScreenAndShowListing
    };
};

export default useChatContainer;
