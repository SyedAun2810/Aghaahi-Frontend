import utilService from "@Utils/utils.service";
import ChatUserCard from "../Components/ChatUserCard";
import ChatListSkeleton from "../Components/ChatListSkeleton";
import CustomSearch from "@Components/CustomSearch/CustomSearch";

import Placeholder from "@Assets/images/avatar-placeholder.png";
import { DataNotFound } from "@Components/DataNotFound";
import { useEffect } from "react";
import SocketIO from "@Services/socket-service";

type InputChangeTypes = {
    fieldName: string;
    searchValue: string;
};

type ChatUserListTypes = {
    meta: any;
    chatList: any;
    chatId: number | undefined;
    selectChatHandler: (id: any) => void;
    onSearch: ({ searchValue, fieldName }: InputChangeTypes) => void;
};

const ChatUserList = ({
    meta,
    chatId,
    chatList,
    onSearch,
    selectChatHandler
}: ChatUserListTypes) => {
    const onChangeInput = (text: string) => {
        onSearch({ searchValue: text, fieldName: "SearchBy" });
    };

    const handleFetchMore = (e: React.UIEvent<HTMLElement>) => {
        utilService.handleFetchOnScroll(e, meta);
    };

    // message and typing event listeners
    const listingEvents = () => {
        // listing for message events
        SocketIO.listen("message", (data: any) => {
            meta.refetch();
        });
        SocketIO.listen("edit_message", (data: any) => {
            meta.refetch();
        });
        SocketIO.listen("delete_message", (data: any) => {
            meta.refetch();
        });
    };

    // listing for events
    useEffect(() => {
        const socketConnectionInterval = setInterval(() => {
            if (SocketIO.socketInstance.current?.connected) {
                if (!chatId) {
                    listingEvents();
                }
                clearInterval(socketConnectionInterval);
            }
        }, 500);

        return () => {
            if (socketConnectionInterval) clearInterval(socketConnectionInterval);
            SocketIO.removeListeners(["message", "edit_message", "delete_message"]);
        };
    }, [chatId]);

    return (
        <>
            <div className="px-2   pt-4">
                {/* <div className="w-full ">
                    <CustomSearch
                        debounceSearch={(text) => {
                            onChangeInput(text);
                        }}
                        className="w-full mb-2 md:w-full 2xl:w-full max-w-full"
                        placeholder="Search User"
                    />
                </div> */}
                <div className="h-[77vh]  overflow-auto px-1" onScroll={handleFetchMore}>
                    {meta?.isFetching ? (
                        <ChatListSkeleton />
                    ) : chatList?.length ? (
                        chatList?.map((item: any, index: number) => {
                            const user = {
                                id: item?.Id,
                                FullName: item?.FullName,
                                time: utilService.renderDateAndTime(item?.LastMessage?.DateTime),
                                ProfilePicture: item?.ProfilePicture || Placeholder,
                                lastMsg: item?.LastMessage?.Content,
                                isOnline: item?.IsOnline,
                                unReadMessageCount: item?.UnreadCount,
                                hasAttachments: item?.LastMessage?.MessageAttachments?.length
                            };
                            return (
                                <ChatUserCard
                                    key={index}
                                    user={user}
                                    chatId={chatId}
                                    onHeadClick={selectChatHandler}
                                />
                            );
                        })
                    ) : (
                        <DataNotFound message="User Not Found!" />
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatUserList;
