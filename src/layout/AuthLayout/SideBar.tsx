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

    // State to track the selected chat, defaulting to the first chat
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

    const handleChatSelect = (chat: string) => {
        setSelectedChat(chat);
    };

    const handleRenameChat = (chat: string) => {
        setRenamingChat(chat);
        setRenameValue(chat);
    };

    const handleRenameSubmit = () => {
        setHistoryChats((prevChats) =>
            prevChats.map((chat) => (chat === renamingChat ? renameValue : chat))
        );
        setRenamingChat(null);
        setRenameValue("");
    };

    const handleDeleteChat = () => {
        setHistoryChats((prevChats) => prevChats.filter((chat) => chat !== chatToDelete));
        setDeleteChat(false);
        setChatToDelete(null);
    };

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

    return (
        <div className="">
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
                            <button className="border-none flex items-center justify-center cursor-pointer">
                                <Flex justify="center" align="center">
                                    <PlusIcon height={28} width={28} />
                                    <p className="ml-2">New Chat</p>
                                </Flex>
                            </button>
                        </div>

                        <p className="ml-4 mt-4">Recent</p>
                        <div className="mt-6">
                            {historyChats.map((chat, index) => (
                                <Flex
                                    key={index}
                                    align="center"
                                    className={`mx-4 my-4 cursor-pointer px-3 py-2 rounded-2xl ${
                                        selectedChat === chat ? "bg-gray-200" : "bg-transparent"
                                    }`}
                                    onClick={() => handleChatSelect(chat)}
                                    style={{ position: "relative" }}
                                >
                                    <ChatIcon height={22} width={22} />
                                    <p className="ml-2">{chat}</p>
                                    <div className="ml-auto">
                                        <Dropdown
                                            overlay={menu(chat)}
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
                            ))}
                        </div>
                    </>
                )}
            </Sider>

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

export default SideBar;
