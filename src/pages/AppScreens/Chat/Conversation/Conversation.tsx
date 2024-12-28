import ChatViewBox from "../Components/ChatViewBox";
import ConversationHeader from "../Components/ConversationHeader";
import useConversationContainer from "./useConversationContainer";
import ConversationFooter from "../Components/ConversationFooter";

import Placeholder from "@Assets/images/avatar-placeholder.png";

type ConversationDataTypes = {
    chatList: any;
    isMobileScreen: boolean;
    chatId: number | undefined;
    selectedUserInfo: any;
    BackIconClickHandler: () => void;
};
const Conversation = ({
    chatId,
    chatList,
    isMobileScreen,
    chatListingMeta,
    selectedUserInfo,
    BackIconClickHandler
}: ConversationDataTypes) => {
    const selectedUserData = selectedUserInfo || chatList?.find((item: any) => item?.Id === chatId);
    const {
        meta,
        images,
        chatRef,
        messages,
        setImages,
        uploadRef,
        editMsgData,
        onlineStatus,
        sendingMessage,
        updateMsgHandler,
        handleSendMessage,
        onEditMessageClick,
        handleDeleteMedia,
        onAttachmentClick,
        isMessageTypingData,
        deleteMessageHandler,
        handleAttachmentChange
    } = useConversationContainer(chatId, chatListingMeta);

    return (
        <div className="chat-conversation flex flex-col h-[88vh]">
            <ConversationHeader
                isMobileScreen={isMobileScreen}
                chatId={chatId}
                onlineStatus={onlineStatus?.[0]}
                displayName={selectedUserData?.FullName}
                userImage={selectedUserData?.ProfilePicture || Placeholder}
                BackIconClickHandler={BackIconClickHandler}
                isMessageTyping={isMessageTypingData}
            />
            <ChatViewBox
                chatId={chatId}
                meta={meta}
                messages={messages}
                scrollBoxRef={chatRef}
                onEditMessageClick={onEditMessageClick}
                deleteMessageHandler={deleteMessageHandler}
            />

            <ConversationFooter
                chatRef={chatRef}
                chatId={chatId}
                images={images}
                setImages={setImages}
                editMsgData={editMsgData}
                sendingMessage={sendingMessage}
                sendMessage={handleSendMessage}
                onUploadMedia={onAttachmentClick}
                updateMsgHandler={updateMsgHandler}
                imageDeleteHandler={handleDeleteMedia}
            />
            <input
                className="hidden"
                onChange={handleAttachmentChange}
                ref={uploadRef}
                type="file"
                multiple
            />
        </div>
    );
};

export default Conversation;
