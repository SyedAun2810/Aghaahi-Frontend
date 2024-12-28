import React, { useRef } from "react";

import MessageItem from "./MessageItem";
import utilService from "@Utils/utils.service";
import { ChatBoxProps, Message } from "../types";
import ScrollButton from "./ScrollButton/ScrollButton";
import { DataNotFound } from "@Components/DataNotFound";
import ListRenderer from "@Components/list-renderer/list-renderer";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";
import ConversationBodySkeleton from "./ChatContainer/ConversationSkeleton/ConversationBodySkeleton";

export default function ChatViewBox({
    meta,
    scrollBoxRef,
    messages = [],
    chatId,
    deleteMessageHandler,
    onEditMessageClick
}: ChatBoxProps) {
    if (!messages?.[0]) return <ConversationBodySkeleton />;

    const scrollRef = useRef<{
        open: () => void;
        close: () => void;
        isOpen: () => boolean;
    }>(null);

    const prevScrollValue = useRef<number>(0);

    function handleFetchMore(e: React.UIEvent<HTMLElement>) {
        let currentScrollValue = Math.abs(e.currentTarget.scrollTop);
        if (currentScrollValue > 50) {
            scrollRef.current?.open();
        } else if (scrollRef.current?.isOpen()) {
            scrollRef.current?.close();
        }
        prevScrollValue.current = currentScrollValue;
        utilService.handleFetchOnScroll(e, meta);
    }
    return (
        <>
            <ListRenderer<Message>
                NoDataComponent={<DataNotFound />}
                isFetching={meta?.isFetchingNextPage}
                itemWrapperProps={{
                    onScroll: handleFetchMore,
                    ref: scrollBoxRef
                }}
                LoadingComponent={
                    <div style={{ textAlign: "center" }}>
                        <ProgressLoader />
                    </div>
                }
                data={messages}
                renderItem={(item, index) => (
                    <MessageItem
                        item={item}
                        key={item?.Id}
                        chatId={chatId}
                        onEditMessageClick={onEditMessageClick}
                        deleteMessageHandler={deleteMessageHandler}
                        next={messages[index - 1]}
                        prev={messages[index + 1] ?? null}
                    />
                )}
            />
            <ScrollButton scrollRef={scrollRef} scrollBoxRef={scrollBoxRef} />
        </>
    );
}
