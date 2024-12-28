import { memo } from "react";
import { Space, Tag } from "antd";

import utilService from "@Utils/utils.service";
import { ChatItemStyles } from "@Constants/chat";
import { MessageItemProps } from "../types";
import RenderImages from "./ChatContainer/MessageContainer/RenderImages/RenderImages";

import DeleteMessageIcon from "@Assets/icons/deleteMessage.svg";
import { EditOutlined } from "@ant-design/icons";
export default memo(function MessageItem({
    item,
    prev,
    next,
    chatId,
    deleteMessageHandler,
    onEditMessageClick
}: MessageItemProps) {
    const {
        color,
        textAlign,
        direction,
        background,
        messageAlign,
        detailDirection,
        boxBorderRadius
    } = ChatItemStyles[`${Boolean(item?.IsSelf)}`];

    const presentDate = utilService.convertDateTime(item?.DateTime, false, "DD/MM/YY");
    const previousDate = utilService.convertDateTime(prev?.DateTime, false, "DD/MM/YY");
    const currentTime = utilService.convertDateTime(item?.DateTime, false, "hh:mm A");
    const nextTime = utilService.convertDateTime(next?.DateTime, false, "hh:mm A");
    const isNextTime = next && currentTime === nextTime && next?.IsSelf === item?.IsSelf;
    const isSameDate = presentDate == previousDate;
    return (
        <>
            <div className="mb-3 px-3">
                <div className={`flex ${direction} items-center `}>
                    <div className={`flex flex-col items-end `} style={{ maxWidth: "80%" }}>
                        <div className={`${messageAlign} w-full`}>
                            <div
                                className={`flex relative z-[1] items-center mb-1 ${direction} gap-2`}
                            >
                                {Boolean(item?.MessageAttachments?.length) ? (
                                    <RenderImages
                                        mediaImages={item?.MessageAttachments}
                                        message={item?.Content}
                                        borderColor={background}
                                        color={color}
                                        borderRadius={boxBorderRadius}
                                    />
                                ) : (
                                    <div
                                        className={`${background} ${boxBorderRadius} py-[13px] px-[20px] w-full`}
                                    >
                                        <p className={`${color} font-[700] text-[14px]`}>
                                            {item?.UserName}
                                        </p>
                                        <p className={`${color}  break-words text-[16px]`}>
                                            {item?.Content}
                                        </p>
                                    </div>
                                )}
                                {item?.IsSelf ? (
                                    <DeleteMessageIcon
                                        style={{
                                            minWidth: "36px",
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            deleteMessageHandler({
                                                chatId: Number(chatId),
                                                messageId: item?.Id
                                            })
                                        }
                                    />
                                ) : null}
                                {!Boolean(item?.MessageAttachments?.length) && item?.IsSelf ? (
                                    <div
                                        className="w-[36px] h-[36px] cursor-pointer flex items-center justify-center"
                                        style={{
                                            minWidth: "36px",
                                            border: "1px solid #f9f9f9",
                                            borderRadius: "100%"
                                        }}
                                    >
                                        <EditOutlined
                                            onClick={() =>
                                                onEditMessageClick({
                                                    messageId: item?.Id,
                                                    content: item?.Content
                                                })
                                            }
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {!isNextTime && (
                            <div
                                className={`flex ${textAlign} w-full mb-1 ${detailDirection} items-center `}
                            >
                                <Space className="justify-end">
                                    <p className={"text-xs"}>{currentTime}</p>
                                </Space>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!isSameDate && (
                <div className="text-center mb-3">
                    <Tag>{utilService.renderDate(item?.DateTime)}</Tag>
                </div>
            )}
        </>
    );
});
