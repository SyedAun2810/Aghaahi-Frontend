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
    //console.log("route", employeeId);
    let isDashboard = CheckRoute(route);

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
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT}`);
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

    return (
        <div>
            {
                !isDashboard &&
                <Sider
                    width={220}
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsible
                    theme="light"
                    className={`bg-white ${customSiderClass} h-[100vh]`}
                    onCollapse={(collapsed) => setIsCollapsed(collapsed)}
                    trigger={
                        <div
                            onMouseEnter={() => setIsHovered(true)} // Show hover state
                            onMouseLeave={() => setIsHovered(false)} // Hide hover state
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                cursor: "pointer",
                                backgroundColor: isHovered ? "#f0f0f0" : "transparent", // Change background on hover
                                transition: "background-color 0.3s",
                            }}
                        >
                            {isCollapsed ? (
                                <MenuUnfoldOutlined style={{ fontSize: "18px" }} />
                            ) : (
                                <MenuFoldOutlined style={{ fontSize: "18px" }} />
                            )}
                        </div>
                    }
                >
                    {!isCollapsed && (
                        <>
                            <Flex className="cursor-pointer" justify="center">
                                <img
                                    src={Logo}
                                    className="text-main-orange h-32 w-32"
                                    onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT)}
                                />
                            </Flex>

                            <div className="flex items-center justify-center">
                                <button className="border-none flex items-center justify-center bg-white cursor-pointer" onClick={() => {
                                    handleNewChat()

                                }}>
                                    <Flex justify="center" align="center">
                                        <PlusIcon height={28} width={28} />
                                        <p className="ml-2">New Chat</p>
                                    </Flex>
                                </button>
                            </div>
                            <div className="mt-6 h-[75%] overflow-y-auto">
                                {isFetching ? (
                                    // Skeleton Loader
                                    <div className="px-4">
                                        {[...Array(8)].map((_, index) => (
                                            <div
                                                key={index}
                                                className="p-4 bg-gray-200 animate-pulse rounded-lg my-4"
                                            >
                                                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        {/* Render "Today" Chats */}
                                        {categorizedChats.today.length > 0 && (
                                            <>
                                                <p className="ml-3 text-md font-bold  text-[#5950CB]">Today</p>
                                                {categorizedChats.today.map((chat, index) => (
                                                    <Flex
                                                        key={index}
                                                        align="center"
                                                        className={`cursor-pointer px-2 py-2 rounded-lg ${selectedChat === chat.id.toString() ? "bg-[#7C5EF2] text-white mx-1 pr-2 my-2" : "bg-transparent ml-2 my-2"
                                                            }`}
                                                        onMouseEnter={() => setHoveredChat(chat.id.toString())} // Set hovered chat
                                                        onMouseLeave={() => setHoveredChat(null)} // Clear hovered chat
                                                        onClick={() => handleChatSelect(chat.id)}
                                                        style={{ position: "relative" }}
                                                    >
                                                        <p className="ml-2 text-md">
                                                            {chat.name || "User Prompt"}
                                                        </p>
                                                        {hoveredChat === chat.id.toString() && ( // Show dots on hover
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
                                                <p className="ml-3 text-md font-bold  text-[#5950CB]">Last 7 Days</p>
                                                {categorizedChats.last7Days.map((chat, index) => (
                                                    <Flex
                                                        key={index}
                                                        align="center"
                                                        className={`cursor-pointer px-2 py-2 rounded-lg ${selectedChat === chat.id.toString() ? "bg-[#7C5EF2] text-white mx-1 pr-2 my-2" : "bg-transparent ml-2 my-2"
                                                            }`}
                                                        onMouseEnter={() => setHoveredChat(chat.id.toString())} // Set hovered chat
                                                        onMouseLeave={() => setHoveredChat(null)} // Clear hovered chat
                                                        onClick={() => handleChatSelect(chat.id)}
                                                        style={{ position: "relative" }}
                                                    >
                                                        <p className="ml-2 text-md">
                                                            {chat.name || "User Prompt"}
                                                        </p>
                                                        {hoveredChat === chat.id.toString() && ( // Show dots on hover
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
                                                                    />
                                                                </Dropdown>
                                                            </div>
                                                        )}
                                                    </Flex>
                                                ))}
                                            </>
                                        )}

                                        {/* No Chats */}
                                        {categorizedChats.today.length === 0 &&
                                            categorizedChats.last7Days.length === 0 && (
                                                <p className="ml-4">No Recent Chats</p>
                                            )}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </Sider>
            }

            <Modal
                visible={!!renamingChat}
                title="Rename Chat"
                onCancel={() => setRenamingChat(null)}
                onOk={handleRenameSubmit}
            >
                <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    placeholder="Enter new chat name"
                />
            </Modal>

            <Modal
                visible={deleteChat}
                title="Delete Chat"
                onCancel={() => setDeleteChat(false)}
                onOk={handleDeleteChat}
            >
                <p>Are you sure you want to delete this chat?</p>
            </Modal>
        </div>
    );
};

const useChatHistoryListing = (employeeId: any) => {
    return useQuery(
        [queryKeys.chat.history, employeeId], // Include employeeId in the query key
        async () => {
            const { ok, data } = await GetChatHistoryListing(employeeId);
            if (ok) {
                return data;
            }
            throw new Error("Failed to fetch chat history");
        },
        {
            enabled: !!employeeId || employeeId === null, // Ensure the query runs only when employeeId is defined or null
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
