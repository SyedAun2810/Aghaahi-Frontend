import { Col, Row, Space } from "antd";

import BackIcon from "@Assets/icons/backIcon.svg";
import { getDateByTime } from "../utils";

export const onlineBorderClass = "border border-2 border-main-orange";

type ConversationHeaderTypes = {
    chatId: number | undefined;
    displayName: string;
    userImage: string;
    onlineStatus: { IsOnline: boolean; LastSeen: string };
    isMessageTyping: { isTyping: boolean; ChatId: undefined | number };
    isMobileScreen: boolean;
    BackIconClickHandler: () => void;
};

const TYPING_KEY = "typing...";
const ONLINE_KEY = "Online";
const ConversationHeader = ({
    chatId,
    onlineStatus,
    userImage,
    displayName,
    isMobileScreen,
    isMessageTyping,
    BackIconClickHandler
}: ConversationHeaderTypes) => {
    const { IsOnline, LastSeen } = onlineStatus || {};
    const formattedLastSeenTime = getDateByTime(LastSeen);
    const displayText = () => {
        if (isMessageTyping?.isTyping && isMessageTyping?.ChatId === Number(chatId)) {
            return TYPING_KEY;
        }
        if (IsOnline) return ONLINE_KEY;
        return `last seen ${formattedLastSeenTime}`;
    };
    return (
        <Row
            justify={"space-between"}
            align={"middle"}
            className="border-bottom py-2 h-[64px] flex-grow-0 px-4"
        >
            <Col>
                <Space direction="horizontal" size={[8, 16]}>
                    {isMobileScreen ? (
                        <BackIcon
                            className="cursor-pointer mt-[3px]"
                            onClick={BackIconClickHandler}
                        />
                    ) : null}
                    <img
                        src={userImage}
                        className={`${IsOnline ? onlineBorderClass : ""} lg:w-[38px] xl:w-[40px] 2xl:w-[45px] md:w-[36px] lg:h-[38px] xl:h-[40px] 2xl:h-[45px] md:h-[36px] object-cover rounded-full`}
                    />
                    <div className="flex flex-col">
                        <p className="text-sm font-[400] text-light-text ">{displayName}</p>
                        <p className="text-xs font-[400] mt-1">{displayText()}</p>
                    </div>
                </Space>
            </Col>
            <Col className="flex align-middle"></Col>
        </Row>
    );
};

export default ConversationHeader;
