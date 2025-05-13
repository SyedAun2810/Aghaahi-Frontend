import PlusIcon from "@Assets/icons/PlusIcon.svg";
import ChatIcon from "@Assets/icons/messages.svg";
import Logo from "@Assets/images/logo.png";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { ModalMethodsTypes } from "@Utils/types";
import { Flex } from "antd";
import Sider from "antd/es/layout/Sider";
import { useRef, useState, useEffect } from "react";
import { useAuthLayoutContainer } from "./useAuthLayoutContainer";

import { EllipsisOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Input, Modal } from "antd";
import { arrayOfDashboardItems, CheckRoute } from "@Constants/dashboard.constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@Constants/queryKeys";
import ApiService, { apiService } from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import NotificationService from "@Services/NotificationService";
import { queryClient } from "@Api/Client";
import dayjs from "dayjs"; // Ensure dayjs is installed for date manipulation
import { useLocation } from "react-router-dom"; // Ensure react-router-dom is installed

const SideBar = () => {
    const { route, selectedKey, navigate } = useAuthLayoutContainer();
    const location = useLocation(); // Get the current URL
    const modalRef = useRef<ModalMethodsTypes | null>(null);
    const id = parseInt(route[route.length - 1]) || null; // Extract the ID from the URL
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [visibleChatsCount, setVisibleChatsCount] = useState(10);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // State to track the list of chats
    const [historyChats, setHistoryChats] = useState<string[]>([
        "Employee Details",
        "Earnings Details",
        "Leave Details",
        "Sales Details",
    ]);

    let employeeId = null;
    let isEmployeeChat = false

    if (route[1] && route[2] == "employee-prompt-chat") {
        employeeId = route[1];
        isEmployeeChat = true;
    }


    const [selectedChat, setSelectedChat] = useState<string | null>(historyChats[0]);

    // State to track whether the sidebar is collapsed
    const [hoveredChat, setHoveredChat] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false); // Track hover state

    // State for renaming a chat
    const [renamingChat, setRenamingChat] = useState<string | null>(null);
    const [deleteChat, setDeleteChat] = useState<boolean>(false);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState<string>("");

    const customSiderClass =
        selectedKey === "banner-ad-management" ? " change-svg custom-sidebar" : "custom-sidebar";

    const handleChatSelect = (chatId: any) => { 
        if(isEmployeeChat){
            navigate(`/${employeeId}/${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_PROMPT_CHAT}/${chatId}`);
        }else{
            navigate(`${NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT}/${chatId}`);
        }

        setSelectedChat(id);
    };

    // setSelectedChat(id);navigate(`/${couponId}/${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_PROMPT_CHAT}`)

    const handleRenameChat = (chat: string) => {
        setRenamingChat(chat);
        //console.log("chat", chat);
        let name = chatHistory.data.result.find((item: any) => item.id === chat)?.name;
        setRenameValue(name);
        //console.log("name", chatHistory);
    };

    const handleRenameSubmit = () => {
        renameChatApi({ chatId: renamingChat, name: renameValue })
        setRenamingChat(null);
        setRenameValue("");
    };

    const handleDeleteChat = async () => {
        if (chatToDelete !== null) {
            try {
                await deleteChatApi(chatToDelete); // Delete the chat

                // Update the chat history after deletion
                const updatedChatHistory = chatHistoryData.filter(
                    (chat) => chat.id !== chatToDelete
                );

                if (updatedChatHistory.length > 0) {
                    // Navigate to the last chat in the updated history
                    const lastChat = updatedChatHistory[0];
                    navigate(`${NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT}/${lastChat.id}`);
                    setSelectedChat(lastChat.id);
                } else {
                    // If no chats exist, navigate to a new chat
                    handleNewChat();
                }
            } catch (error) {
                console.error("Error deleting chat:", error);
            }
        }

        setDeleteChat(false);
        setChatToDelete(null);
    };

    const { data: chatHistory, isFetching } = useChatHistoryListing(employeeId);

    //console.log("chatHistory", employeeId);
    const chatHistoryData = chatHistory?.data.result || [];


    useEffect(() => {
        queryClient.invalidateQueries([queryKeys.chat.history]);
    },[]);

    const menu = (chat: string) => (
        <Menu>
            <Menu.Item key="rename" onClick={() => handleRenameChat(chat)}>
                Rename
            </Menu.Item>
            <Menu.Item key="delete" onClick={() => {
                setDeleteChat(true);
                setChatToDelete(chat);
            }}>
                Delete
            </Menu.Item>
        </Menu>
    );


    const { mutateAsync: deleteChatApi, isLoading } = useDeleteChat();
    const { mutateAsync: renameChatApi, isLoading: isRenamingChat } = useRenameChat();

    async function handleNewChat() {
        queryClient.invalidateQueries([queryKeys.chat.conversation]);
        navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT);
    }

    // Categorize chats into "Today" and "Last 7 Days"
    const categorizedChats = chatHistoryData.reduce(
        (acc: { today: any[]; last7Days: any[] }, chat) => {
            const createdAt = dayjs.unix(chat.created_at); // Convert timestamp to dayjs object
            const now = dayjs();

            if (createdAt.isSame(now, "day")) {
                acc.today.push(chat);
            } else {
                acc.last7Days.push(chat);
            }

            return acc;
        },
        { today: [], last7Days: [] }
    );
    useEffect(() => {
        const match = location.pathname.match(/prompt-chat\/(\d+)/);
        if (match && match[1]) {
            const chatId = match[1];
            setSelectedChat(chatId);
        }
    }, [location.pathname]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // Load more when user scrolls to bottom (with 20px threshold)
        if (scrollHeight - scrollTop - clientHeight < 20 && !isLoadingMore) {
            setIsLoadingMore(true);
            // Simulate loading delay
            setTimeout(() => {
                setVisibleChatsCount(prev => prev + 10);
                setIsLoadingMore(false);
            }, 500);
        }
    };

    return (
        <div>
                <Sider
                    width={220}
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsible
                    theme="light"
                    className={`bg-white dark:bg-[#181818] ${customSiderClass} h-[100vh] flex flex-col`}
                    onCollapse={(collapsed) => setIsCollapsed(collapsed)}
                    trigger={
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                cursor: "pointer",
                                backgroundColor: isHovered ? "#f0f0f0" : "transparent",
                                transition: "background-color 0.3s",
                            }}
                            className="dark:bg-[#181818]"
                        >
                            {isCollapsed ? (
                                <MenuUnfoldOutlined style={{ fontSize: "18px" }} className="dark:text-white" />
                            ) : (
                                <MenuFoldOutlined style={{ fontSize: "18px" }} className="dark:text-white" />
                            )}
                        </div>
                    }
                >
                    {!isCollapsed && (
                        <div className="flex flex-col h-full">
                            <Flex className="cursor-pointer" justify="center">
                                <img
                                    src={Logo}
                                    className="text-main-orange h-32 w-32"
                                    onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT)}
                                />
                            </Flex>

                            <div className="flex items-center justify-center">
                                <button className="border-none flex items-center justify-center bg-white dark:bg-[#212121] cursor-pointer p-2 px-6 rounded-full" onClick={handleNewChat}>
                                    <Flex justify="center" align="center">
                                        <div className="dark:brightness-0 dark:invert">
                                            <PlusIcon height={28} width={28} />
                                        </div>
                                        <p className="ml-2 dark:text-white">New Chat</p>
                                    </Flex>
                                </button>
                            </div>
                            <div 
                                ref={chatContainerRef}
                                className="mt-6 flex-1 overflow-y-auto min-h-0"
                                onScroll={handleScroll}
                            >
                                {isFetching ? (
                                    // Skeleton Loader
                                    <div className="px-4">
                                        {[...Array(8)].map((_, index) => (
                                            <div
                                                key={index}
                                                className="p-4 bg-gray-200 dark:bg-[#212121] animate-pulse rounded-lg my-4"
                                            >
                                                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                                                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-2">
                                        {/* Render "Today" Chats */}
                                        {categorizedChats.today.length > 0 && (
                                            <>
                                                <p className="ml-3 text-md font-bold text-[#5950CB] dark:text-purple-400">Today</p>
                                                {categorizedChats.today.slice(0, visibleChatsCount).map((chat: any, index: number) => (
                                                    <Flex
                                                        key={index}
                                                        align="center"
                                                        className={`cursor-pointer px-2 py-2 rounded-lg ${
                                                            selectedChat === chat.id.toString()
                                                                ? "bg-[#7C5EF2] text-white mx-1 pr-2 my-2"
                                                                : "bg-transparent ml-2 my-2 hover:bg-gray-100 dark:hover:bg-[#212121]"
                                                        }`}
                                                        onMouseEnter={() => setHoveredChat(chat.id.toString())}
                                                        onMouseLeave={() => setHoveredChat(null)}
                                                        onClick={() => handleChatSelect(chat.id)}
                                                        style={{ position: "relative" }}
                                                    >
                                                        <p className="ml-2 text-md dark:text-gray-200">
                                                            {chat.name || "User Prompt"}
                                                        </p>
                                                        {hoveredChat === chat.id.toString() && (
                                                            <div className="ml-auto mr-2">
                                                                <Dropdown
                                                                    overlay={menu(chat.id)}
                                                                    trigger={["click"]}
                                                                    overlayStyle={{ minWidth: 120 }}
                                                                >
                                                                    <EllipsisOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        className="dark:text-gray-200"
                                                                    />
                                                                </Dropdown>
                                                            </div>
                                                        )}
                                                    </Flex>
                                                ))}
                                            </>
                                        )}

                                        {/* Render "Last 7 Days" Chats */}
                                        {categorizedChats.last7Days.length > 0 && (
                                            <>
                                                <p className="ml-3 text-md font-bold text-[#5950CB] dark:text-purple-400">Last 7 Days</p>
                                                {categorizedChats.last7Days.slice(0, visibleChatsCount).map((chat: any, index: number) => (
                                                    <Flex
                                                        key={index}
                                                        align="center"
                                                        className={`cursor-pointer px-2 py-2 rounded-lg ${
                                                            selectedChat === chat.id.toString()
                                                                ? "bg-[#7C5EF2] text-white mx-1 pr-2 my-2"
                                                                : "bg-transparent ml-2 my-2 hover:bg-gray-100 dark:hover:bg-[#212121]"
                                                        }`}
                                                        onMouseEnter={() => setHoveredChat(chat.id.toString())}
                                                        onMouseLeave={() => setHoveredChat(null)}
                                                        onClick={() => handleChatSelect(chat.id)}
                                                        style={{ position: "relative" }}
                                                    >
                                                        <p className="ml-2 text-md dark:text-gray-200">
                                                            {chat.name || "User Prompt"}
                                                        </p>
                                                        {hoveredChat === chat.id.toString() && (
                                                            <div className="ml-auto mr-2">
                                                                <Dropdown
                                                                    overlay={menu(chat.id)}
                                                                    trigger={["click"]}
                                                                    overlayStyle={{ minWidth: 120 }}
                                                                >
                                                                    <EllipsisOutlined
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        className="dark:text-gray-200"
                                                                    />
                                                                </Dropdown>
                                                            </div>
                                                        )}
                                                    </Flex>
                                                ))}
                                            </>
                                        )}

                                        {/* Loading indicator */}
                                        {isLoadingMore && (
                                            <div className="flex justify-center py-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#5950CB] dark:border-purple-400"></div>
                                            </div>
                                        )}

                                        {/* No Chats */}
                                        {categorizedChats.today.length === 0 &&
                                            categorizedChats.last7Days.length === 0 && (
                                                <p className="ml-4 dark:text-gray-200">No Recent Chats</p>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Sider>

            <Modal
                visible={!!renamingChat}
                title="Rename Chat"
                onCancel={() => setRenamingChat(null)}
                onOk={handleRenameSubmit}
                className="dark:bg-[#212121]"
            >
                <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    placeholder="Enter new chat name"
                    className="dark:bg-[#212121] dark:text-white"
                />
            </Modal>

            <Modal
                visible={deleteChat}
                title="Delete Chat"
                onCancel={() => setDeleteChat(false)}
                onOk={handleDeleteChat}
                className="dark:bg-[#212121]"
            >
                <p className="dark:text-white">Are you sure you want to delete this chat?</p>
            </Modal>
        </div>
    );
};

const useChatHistoryListing = (employeeId: any) => {
    return useQuery(
        [queryKeys.chat.history, employeeId],
        async () => {
            const { ok, data } = await GetChatHistoryListing(employeeId);
            if (ok) {
                return data;
            }
            throw new Error("Failed to fetch chat history");
        },
        {
            enabled: !!employeeId || employeeId === null,
            refetchOnWindowFocus: false, // Prevent refetching on window focus
            staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        }
    );
};

async function GetChatHistoryListing(employeeId: any) {
    if (employeeId) {
        // Call the employee-specific chat history API
        return await ApiService.get(`${API_CONFIG_URLS.Chatbot.EMPLOYEE_CHAT_HISTORY}/${employeeId}`);
    } else {
        // Call the general chat history API
        return await ApiService.get(`${API_CONFIG_URLS.Chatbot.HISTORY}`);
    }
}
export const useInitiateChat = () => {
    return useMutation(() => initiateChat(), {
        onSuccess: ({ ok, response, data }: any) => {

            //console.log("data from use muttation ", data);
            //console.log("respponse  from use muttation ", response);
            return data;
        },
        onError: (err: any) => {
            throw err;
        }
    });
};

async function initiateChat() {
    const response = await ApiService.put(
        `${API_CONFIG_URLS.Chatbot.CONVERSATION}`
    );
    return response;
}

const useDeleteChat = () => {
    return useMutation(
        async (chatId: string) => {
            const response = await apiService.remove(`${API_CONFIG_URLS.Chatbot.CONVERSATION}/${chatId}`);
            if (response.ok) {
                return response.data;
            }
            throw new Error("Failed to delete chat");
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([queryKeys.chat.history]);

            },
            onError: (error) => {
                console.error("Error deleting chat:", error);
            },
        }
    );
};


const useRenameChat = () => {
    return useMutation(
        async (payload: any) => {
            const response = await apiService.put(`${API_CONFIG_URLS.Chatbot.CONVERSATION}/${payload.chatId}`, { name: payload.name });
            if (response.ok) {
                return response.data;
            }
            throw new Error("Failed to update chat");
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([queryKeys.chat.history]);

            },
            onError: (error) => {
                console.error("Error update chat:", error);
            },
        }
    );
};



export default SideBar;
