
import { Col, Flex, Form, Input, Row } from "antd";
import React, { useEffect } from "react";

import Logo from "@Assets/images/logo.png";
import VoiceICon from "@Assets/images/mic.png";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useAuthLayoutContainer } from "@Layout/AuthLayout/useAuthLayoutContainer";

interface ChatFooterProps {
    form: any; // You can replace `any` with a more specific type for your form (e.g., `FormInstance` from 'antd')
}

const ChatFooter: React.FC<{ form: any; localMessage: string; setLocalMessage: (message: string) => void; handleFormSubmit: (data: any) => void; isEmptyChat: boolean }> = ({ form, localMessage, setLocalMessage, handleFormSubmit, isEmptyChat }) => {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const { route, selectedKey, navigate } = useAuthLayoutContainer();


    let anotherUserChat = false;
    if (route[1] && route[2] == "employee-prompt-chat") {
        anotherUserChat = true
    }

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            console.error("Browser does not support speech recognition.");
        }
    }, [browserSupportsSpeechRecognition]);

    useEffect(() => {
        console.log("Transcript", transcript)
        setLocalMessage(transcript); // Update the local message with the transcript
    }, [transcript, setLocalMessage]);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents adding a new line
            form.submit(); // Triggers form submission
        }
    };

    return (
        <div className={`w-full bg-white flex items-center justify-center px-52 ${isEmptyChat ? "h-[100%] pb-64" : " h-[100px]  pt-10 "}`}>
            {
                <Form
                    onFinish={(values) => {
                        handleFormSubmit(values);
                        form.resetFields();
                        setLocalMessage("");
                        resetTranscript(); // Reset the transcript after submission
                    }}
                    form={form}
                    name="chat"
                    className={` w-full ${isEmptyChat ? "" : "bottom-6"}`}
                >
                    <div className="mb-2 px-4 h-20">
                        {isEmptyChat && (
                            <div>
                                <Flex className="cursor-pointer" align="center" justify="center">
                                    <img src={Logo} className="text-main-orange h-20 w-20" />
                                    <h1 className="text-center my-4">Hi, I'm Agaahi.</h1>
                                </Flex>
                            </div>
                        )}
                        {isEmptyChat && <h3 className="text-center my-2">What can I help with?</h3>}
                        <Row className="bg-light-bg rounded-full pl-4 flex items-center h-20">
                            <Col xxl={21} xl={20} lg={19} md={19} sm={19} xs={19}>
                                <div className="flex items-center w-full">
                                    <div className="w-full">
                                        <Input.TextArea
                                            placeholder="Enter your prompt here..."
                                            maxLength={10000}
                                            className="border-none shadow-none scroll-primary bg-transparent"
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
                            <Col xxl={3} xl={3} lg={3} md={4} sm={4} xs={4}>
                                <div className="flex items-center justify-end pr-6">
                                    <button
                                        type="button"
                                        onClick={listening ? stopListening : startListening}
                                        className={`border-none rounded-full w-[46px] h-[46px] flex items-center justify-center p-0`}
                                    >
                                        <img src={VoiceICon} height={30} width={25} />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>

            }
        </div>
    );
};

export default ChatFooter;