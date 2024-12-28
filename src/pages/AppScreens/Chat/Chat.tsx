import { Col, Row } from "antd";

import useChatContainer from "./ChatContainer";
import ChatInfo from "@Pages/AppScreens/Chat/Components/ChatInfo";
import ChatUserList from "@Pages/AppScreens/Chat/ChatUserList/ChatUserList";
import Conversation from "@Pages/AppScreens/Chat/Conversation/Conversation";

const Chat = () => {
    const {
        id,
        chatId,
        onSearch,
        chatListing,
        isMobileScreen,
        chatListingMeta,
        selectedUserInfo,
        selectChatHandler,
        BackIconClickHandler,
        hasSmallerScreenAndShowListing
    } = useChatContainer();

    const CHAT_USER_LIST_COLUMN_SIZE = !hasSmallerScreenAndShowListing ? 0 : 24;
    const CONVERSATION_CON_COLUMN_SIZE = hasSmallerScreenAndShowListing ? 0 : 24;
    return (
        <Row className="bg-white h-[88vh]">
            <Col md={4} xxl={5} xs={CHAT_USER_LIST_COLUMN_SIZE} sm={CHAT_USER_LIST_COLUMN_SIZE}>
                <ChatUserList
                    chatId={chatId}
                    onSearch={onSearch}
                    chatList={chatListing}
                    meta={chatListingMeta}
                    selectChatHandler={selectChatHandler}
                />
            </Col>
            <Col md={20} xxl={19} className={"border-left"} xs={CONVERSATION_CON_COLUMN_SIZE}>
                {id && chatId ? (
                    <Conversation
                        chatId={chatId}
                        chatList={chatListing}
                        isMobileScreen={isMobileScreen}
                        chatListingMeta={chatListingMeta}
                        selectedUserInfo={selectedUserInfo}
                        BackIconClickHandler={BackIconClickHandler}
                    />
                ) : (
                    <ChatInfo />
                )}
            </Col>
        </Row>
    );
};

export default Chat;
