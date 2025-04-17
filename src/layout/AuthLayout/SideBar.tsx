import PlusIcon from "@Assets/icons/PlusIcon.svg";
import ChatIcon from "@Assets/icons/messages.svg";
import Logo from "@Assets/images/logo.png";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { ModalMethodsTypes } from "@Utils/types";
import { Flex } from "antd";
import Sider from "antd/es/layout/Sider";
import { useRef, useState } from "react";
import { useAuthLayoutContainer } from "./useAuthLayoutContainer";

import { EllipsisOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Input, Modal } from "antd";
import { arrayOfDashboardItems } from "@Constants/dashboard.constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@Constants/queryKeys";
import ApiService, { apiService } from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import NotificationService from "@Services/NotificationService";
import { queryClient } from "@Api/Client";

const SideBar = () => {
    const { route, selectedKey, navigate } = useAuthLayoutContainer();
    const modalRef = useRef<ModalMethodsTypes | null>(null);

    // State to track the list of chats
    const [historyChats, setHistoryChats] = useState<string[]>([
        "Employee Details",
        "Earnings Details",
        "Leave Details",
        "Sales Details",
    ]);

    let isDashboard = arrayOfDashboardItems.includes(route[1]);

    const [selectedChat, setSelectedChat] = useState<string | null>(historyChats[0]);

    // State to track whether the sidebar is collapsed
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    // State for renaming a chat
    const [renamingChat, setRenamingChat] = useState<string | null>(null);
    const [deleteChat, setDeleteChat] = useState<boolean>(false);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState<string>("");

    const customSiderClass =
        selectedKey === "banner-ad-management" ? " change-svg custom-sidebar" : "custom-sidebar";

    const handleChatSelect = (chatId: any) => {

        // Check if the selected chat is already in the historyChats array
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT}/${chatId}`);
        setSelectedChat(chatId);
    };

    const handleRenameChat = (chat: string) => {
        setRenamingChat(chat);
        console.log("chat", chat);
        let name = chatHistory.data.result.find((item: any) => item.id === chat)?.name;
        setRenameValue(name);
        console.log("name", chatHistory);
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

    const { data: chatHistory, isFetching } = useChatHistoryListing();
    const chatHistoryData = chatHistory?.data.result || [];


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
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.PROMPT_CHAT}`);
    }
    return (
        <div className="">
            {
                !isDashboard &&
                <Sider
                    width={220}
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsible
                    theme="light"
                    className={`bg-light-bg ${customSiderClass} h-[100vh]`}
                    onCollapse={(collapsed) => setIsCollapsed(collapsed)}
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
                                <button className="border-none flex items-center justify-center cursor-pointer" onClick={() => {
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
                                        {[...Array(5)].map((_, index) => (
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
                                    // Chat History
                                    chatHistoryData.length > 0 ? (
                                        chatHistoryData.map((chatHistoryobject, index) => {
                                            const chat = chatHistoryobject?.name || "User Prompt";
                                            const id = chatHistoryobject?.id || index;
                                            return (
                                                <Flex
                                                    key={index}
                                                    align="center"
                                                    className={`ml-2 mr-4 my-4 cursor-pointer px-3 py-2 rounded-2xl ${selectedChat === id ? "bg-gray-200" : "bg-transparent"
                                                        }`}
                                                    style={{ position: "relative" }}
                                                >
                                                    <p className="ml-2" onClick={() => handleChatSelect(id)}>
                                                        {chat}
                                                    </p>
                                                    <div className="ml-auto">
                                                        <Dropdown
                                                            overlay={menu(id)}
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
                                                </Flex>
                                            );
                                        })
                                    ) : (
                                        <p className="ml-4">No Recent Chats</p>
                                    )
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

const useChatHistoryListing = () => {
    return useQuery([queryKeys.chat.history], async () => {
        const { ok, data } = await GetChatHistoryListing();
        if (ok) {
            return data;
        }
        throw new Error("Failed to fetch employee roles");
    });
};

async function GetChatHistoryListing() {
    const response = await ApiService.get(`${API_CONFIG_URLS.Chatbot.HISTORY}`);
    return response;
}


export const useInitiateChat = () => {
    return useMutation(() => initiateChat(), {
        onSuccess: ({ ok, response, data }: any) => {

            console.log("data from use muttation ", data);
            console.log("respponse  from use muttation ", response);
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
