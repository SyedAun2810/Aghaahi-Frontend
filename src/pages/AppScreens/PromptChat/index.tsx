import Logo from "@Assets/images/logo.png";
import SendIcon from "@Assets/icons/sendIcon.svg";
import VoiceIcon from "@Assets/icons/voiceIcon.svg";
import UserImage from "@Assets/images/avatar-placeholder.png";
import Graph from "@Assets/images/visual.webp";

import { CustomButton } from "@Components/Button";
import { Col, Flex, Form, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import ChatFooter from "./Components/ChatFooter";
import MessageContent from "./Components/MessageContent";
import ChatVisual from "./Components/ChatVisual";
import FileAttachment from "./Components/FileAttachment";


const PromptChat = () => {
    const [form] = Form.useForm();
    const containerRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            scrollToBottom();
        }, 0); 
        
        return () => clearTimeout(timeout); 
    }, []);

    let chatData = []
    let isNoData = chatData.length == 0;
    
    return (
        <div className="bg-white h-[100%]">
            <div className="relative h-[100%]">
         
                <ChatFooter form={form} />
            </div>
        </div>
    );
};

function ChatContent() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const content = "How many employees from store Alpha have been working for more than 5 years? ";
    return (
        <div>
            {" "}
            <Flex className="my-8">
                <div>
                    <img alt="User Image" src={UserImage} className="w-8 h-8" />
                </div>
                <MessageContent
                    isExpanded={isExpanded}
                    toggleExpand={toggleExpand}
                    content={content}
                />
                {content.length > 300 && (
                    <div className="ml-2">
                        {!isExpanded ? (
                            <DownOutlined height={20} width={16} onClick={toggleExpand} />
                        ) : (
                            <UpOutlined height={20} width={16} onClick={toggleExpand} />
                        )}
                    </div>
                )}
            </Flex>
            <Flex>
                <img alt="User Image" src={Logo} className="w-8 h-8" />
                <div className="ml-4 p-4 bg-gray-100 rounded-md shadow-lg w-full">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Store Alpha Employee Report
                    </h2>
                    <p className="mt-2 text-gray-700">
                        Based on the records, Store Alpha employs{" "}
                        <span className="font-bold text-green-600">50</span> staff members.
                    </p>
                    <p className="mt-2 text-gray-700">
                        Out of these, <span className="font-bold text-green-600">12 employees</span>{" "}
                        have been working for more than{" "}
                        <span className="font-bold text-green-600">5 years</span>.
                    </p>
                    <p className="mt-2 text-gray-700">
                        These long-term employees bring significant experience and stability to the
                        store's operations.
                    </p>
                    <p className="mt-4 text-gray-600">
                        If you need a detailed report of their roles or tenure, feel free to let us
                        know!
                    </p>
                </div>
            </Flex>
        </div>
    );
}




export default PromptChat;
