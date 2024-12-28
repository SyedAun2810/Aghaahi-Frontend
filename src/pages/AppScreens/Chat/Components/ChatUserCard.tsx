import React from "react";
import { Badge, Col, Flex, Row, Space } from "antd";

import { User } from "@Utils/types";
import { onlineBorderClass } from "./ConversationHeader";
import TextTruncateWrapper from "@Components/TextTruncateWrapper/TextTruncateWrapper";

import DocumentIcon from "@Assets/icons/Gallery.svg";

interface Props {
    user: User;
    chatId: number | undefined;
    onHeadClick: (id: any) => void;
}

const ChatUserCard: React.FC<Props> = ({ user, chatId, onHeadClick }) => {
    const isSelectedUser = chatId === user?.id;
    return (
        <div
            className={`${isSelectedUser ? "bg-[#E2E2E2] rounded-[10px]" : "rounded-none bg-white"} px-2 mb-1 border-bottom py-[12px]  h-[85px] cursor-pointer  `}
            key={user?.id}
            onClick={() => onHeadClick(user)}
        >
            <Row justify="space-between">
                <Col xxl={2} xl={3} md={3}>
                    <img
                        src={user?.ProfilePicture}
                        alt="user profile image"
                        className={`${
                            user?.isOnline ? onlineBorderClass : ""
                        }  lg:w-[38px] xl:w-[40px] 2xl:w-[45px] md:w-[36px] lg:h-[38px] xl:h-[40px] 2xl:h-[45px] md:h-[36px] object-cover rounded-full`}
                    />
                </Col>
                <Col xxl={18} xl={18} md={15}>
                    <Space direction="vertical" className="w-full ml-2" size={0}>
                        <p className="text-base text-dark-main font-[500] mt-[4px] truncate">
                            {user?.FullName}
                        </p>
                        <div className="text-xs  font-[400] truncate mt-1 ">
                            {!!user?.hasAttachments ? (
                                <div className="flex mt-1">
                                    <DocumentIcon height={14} width={14} stroke={"#717171"} />
                                    <p className="ml-2  w-[70%] font-[400] text-sm text-light-text">
                                        {user?.hasAttachments > 1
                                            ? `Photos (${user?.hasAttachments})`
                                            : `Photo`}
                                    </p>
                                </div>
                            ) : null}
                            {user?.lastMsg
                                ? TextTruncateWrapper({
                                      text: user?.lastMsg,
                                      charLimit: 30,
                                      showMoreOrLess: false,
                                      classes: isSelectedUser
                                          ? "text-main-orange"
                                          : "text-light-text "
                                  })
                                : null}
                        </div>
                    </Space>
                </Col>
                <Col xxl={3} xl={3} md={5} className="pr-2 ">
                    <Flex vertical align="end" className="w-full ">
                        <p
                            className={`text-xs truncate ${!!user?.unReadMessageCount && "text-main-orange"}`}
                        >
                            {user?.time}
                        </p>
                        {user?.unReadMessageCount ? (
                            <Badge
                                count={user?.unReadMessageCount}
                                color="#F38001"
                                style={{ display: "block", marginTop: "20px" }}
                                size="small"
                                overflowCount={10}
                            />
                        ) : null}
                    </Flex>
                </Col>
            </Row>
        </div>
    );
};

export default ChatUserCard;
