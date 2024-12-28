import type { InputRef } from "antd";
import { useEffect, useRef, useState } from "react";
import { Col, Flex, Form, Input, Row } from "antd";

import ImageRenderer from "./ImageRenderer";
import utilService from "@Utils/utils.service";
import SocketIO from "@Services/socket-service";
import { CustomButton } from "@Components/Button";
import { ChatFooterProps } from "../types";

import SendIcon from "@Assets/icons/sendIcon.svg";
import AttachmentsIcon from "@Assets/icons/attachmentsIcon.svg";

const ConversationFooter = ({
    chatId,
    images,
    chatRef,
    uploading,
    sendMessage,
    editMsgData,
    onUploadMedia,
    sendingMessage,
    updateMsgHandler,
    imageDeleteHandler
}: ChatFooterProps) => {
    const [form] = Form.useForm();
    const inputRef = useRef<InputRef>(null);

    const [message, setMessage] = useState("");
    let isUploading = uploading || sendingMessage;

    const onFinish = (values: any) => {
        handleSend();
        form.setFieldValue("message", null);
    };

    const handleInputChange = (e: React.KeyboardEvent<HTMLElement>) => {
        setMessage(e.target.value);
        SocketIO.emit(
            "message_typing",
            {
                ChatId: Number(chatId),
                Content: message
            },
            () => {}
        );
    };
    const handleKeyEnter = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.submit();
        }
    };

    function handleSend() {
        if (isUploading) return;
        if (editMsgData.isEditActive) {
            updateMsgHandler(message);
        } else {
            sendMessage(message);
        }
        setMessage("");
    }

    useEffect(() => {
        if (editMsgData.isEditActive) {
            setMessage(editMsgData.message);
        } else {
            utilService.scrollBottom(chatRef);
        }
    }, [images, editMsgData.isMessageChanging]);

    return (
        <div className="mt-2">
            <div className="media-container flex justify-end flex-wrap relative mr-6">
                {images.map((img, i) => (
                    <ImageRenderer img={img} idx={i} imageDeleteHandler={imageDeleteHandler} />
                ))}
            </div>
            <Form onFinish={onFinish} form={form} name="chat" className="mb-2 px-4">
                <div className="mb-2 px-4">
                    <Row className="bg-light-bg rounded-full  pr-1 pl-4">
                        <Col xxl={22} xl={21} lg={20} md={20} sm={20} xs={20}>
                            <div className="custom-send-message h-full flex items-center w-full ">
                                <div className="w-full" name="message">
                                    <Input.TextArea
                                        value={message}
                                        placeholder="Enter your message here"
                                        maxLength={10000}
                                        className={`border-none shadow-none scroll-primary bg-transparent`}
                                        ref={inputRef}
                                        onChange={handleInputChange}
                                        disabled={false}
                                        autoSize={{ minRows: 0, maxRows: 2 }}
                                        onKeyDown={handleKeyEnter}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xxl={2} xl={3} lg={3} md={4} sm={4} xs={4}>
                            <Flex align="center" justify="center" className="" gap={10}>
                                <AttachmentsIcon
                                    className={`mr-2 cursor-pointer`}
                                    onClick={onUploadMedia}
                                />
                                <CustomButton
                                    className={
                                        "border-none rounded-full w-[46px] h-[46px] flex items-center  justify-center p-0 pt-1 pl-1"
                                    }
                                    disabled={false}
                                    isLoading={false}
                                    htmlType="submit"
                                >
                                    <SendIcon />
                                </CustomButton>
                            </Flex>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    );
};

export default ConversationFooter;
