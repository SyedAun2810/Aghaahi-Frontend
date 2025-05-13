import { Col, Flex, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";

import Logo from "@Assets/images/logo.png";
import VoiceICon from "@Assets/images/mic.png";
import SendIcon from "@Assets/images/send.png";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useAuthLayoutContainer } from "@Layout/AuthLayout/useAuthLayoutContainer";
import useAuthStore from "@Store/authStore";

interface ChatFooterProps {
    form: any;
    localMessage: string;
    setLocalMessage: (message: string) => void;
    handleFormSubmit: (data: any) => void;
    isEmptyChat: boolean;
}

const useTypingEffect = (text: string, speed: number) => {
    const [displayText, setDisplayText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsTypingComplete(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return { displayText, isTypingComplete };
};

const ChatFooter: React.FC<ChatFooterProps> = ({ form, localMessage, setLocalMessage, handleFormSubmit, isEmptyChat }) => {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const { route } = useAuthLayoutContainer();
    const { userData } = useAuthStore();
    const introText = "Hi, I'm Agaahi, What can I help with?";
    const { displayText, isTypingComplete } = useTypingEffect(introText, 50);

    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();
        const userName = userData?.name || '';
        if (hour >= 5 && hour < 12) {
            return `Good Morning${userName ? ', ' + userName : ''} ☀️`;
        } else if (hour >= 12 && hour < 17) {
            return `Good Afternoon${userName ? ', ' + userName : ''} 😎`;
        } else {
            return `Good Evening${userName ? ', ' + userName : ''} 👋`;
        }
    };

    let anotherUserChat = false;
    if (route[1] && route[2] == "employee-prompt-chat") {
        anotherUserChat = true;
    }

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            console.error("Browser does not support speech recognition.");
        }
    }, [browserSupportsSpeechRecognition]);

    useEffect(() => {
        setLocalMessage(transcript);
    }, [transcript, setLocalMessage]);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.submit();
        }
    };

    return (
        <>
            <div className={`w-full bg-white dark:bg-[#212121] flex items-center justify-center px-52 ${isEmptyChat ? "h-[100%] pb-64" : "h-[100px] pt-10"}`}>
                <Form
                    onFinish={(values) => {
                        handleFormSubmit(values);
                        form.resetFields();
                        setLocalMessage("");
                        resetTranscript();
                    }}
                    form={form}
                    name="chat"
                    className={`w-full ${isEmptyChat ? "" : "bottom-6"}`}
                >
                    {isEmptyChat && (
                        <div>
                            <h1 className="text-center my-2 text-4xl animate-fade-in-down dark:text-white">{getTimeBasedGreeting()}</h1>
                            <Flex className="cursor-pointer mt-4 animate-fade-in-up" align="center" justify="center">
                                <img src={Logo} className="text-main-orange h-16 w-16" />
                                <h2 className="text-center my-4 dark:text-white">{displayText}{!isTypingComplete && <span className="animate-blink">|</span>}</h2>
                            </Flex>
                        </div>
                    )}
                    <Row className="flex items-center dark:bg-[#303030] bg-light-bg rounded-full h-20 pl-4">
                        <Col xxl={20} xl={20} lg={20} md={20} sm={20} xs={20}>
                            <div className="flex items-center w-full">
                                <div className="w-full">
                                    <Input.TextArea
                                        placeholder="Enter your prompt here..."
                                        maxLength={10000}
                                        className="border-none shadow-none scroll-primary bg-transparent dark:bg-[#303030] text-lg ml-2 mb-[2px] dark:text-white dark:placeholder-gray-400"
                                        name="message"
                                        autoSize={{ minRows: 0, maxRows: 2 }}
                                        value={localMessage}
                                        onChange={(e) => setLocalMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={anotherUserChat}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4} > 
                            <div className="flex items-center justify-end pr-6 gap-2">
                                <button
                                    type="button"
                                    onClick={listening ? stopListening : startListening}
                                    className={`border-none rounded-full w-[46px] h-[46px] flex items-center justify-center p-0 hover:bg-gray-100 dark:bg-[#303030]transition-colors duration-200`}
                                >
                                    <img src={VoiceICon} height={30} width={25} className={listening ? "animate-pulse" : ""} />
                                </button>
                                <button
                                    type="submit"
                                    className="border-none rounded-full w-[46px] h-[46px] flex items-center justify-center p-0 pr-2 cursor-pointer dark:bg-[#303030] transition-colors duration-200"
                                >
                                    <img src={SendIcon} height={30} width={25} />
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default ChatFooter;