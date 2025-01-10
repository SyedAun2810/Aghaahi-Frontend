import Logo from "@Assets/images/logo.png";
import SendIcon from "@Assets/icons/sendIcon.svg";
import VoiceIcon from "@Assets/icons/voiceIcon.svg";
import UserImage from "@Assets/images/avatar-placeholder.png";
import Graph from "@Assets/images/visual.webp";

import { CustomButton } from "@Components/Button";
import { Col, Flex, Form, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

interface ChatFooterProps {
    form: any; // You can replace `any` with a more specific type for your form (e.g., `FormInstance` from 'antd')
}

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
    
    return (
        <div className="bg-white h-[100%]">
            <div className="relative h-[100%]">
                <div ref={containerRef} className="mx-60 pt-8 h-[85%] overflow-auto scroll-hidden">
                    <ChatContent />
                    <ChatVisual />
                    <ChatContent />
                    <ChatVisual />
                    <ChatContent />
                    <ChatVisual />
                </div>
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

function ChatVisual() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const content =
        "Show a chart of how many employees from store Alpha have been working for more than 5 years? ";
    return (
        <div>
            {" "}
            <Flex className="my-6">
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
                <img src={Graph} alt="graph here" width={500} />
            </Flex>
        </div>
    );
}

const MessageContent = ({ isExpanded, toggleExpand, content }: any) => {
    return (
        <div className="ml-4">
            <p className={`text-base ${isExpanded ? "" : "line-clamp-3"}`}>{content || ""}</p>
        </div>
    );
};

const ChatFooter: React.FC<ChatFooterProps> = ({ form }) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [localMessage, setLocalMessage] = useState<string>(form.getFieldValue("message") || "");
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const initializeRecognition = (): SpeechRecognition | null => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser.");
            return null;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true; // Continuously listen to speech
        recognition.lang = "en-US"; // Set language
        recognition.interimResults = true; // Capture interim results (real-time speech)
        return recognition;
    };

    const startListening = (): void => {
        if (!recognitionRef.current) {
            recognitionRef.current = initializeRecognition();
        }
        if (recognitionRef.current) {
            setIsListening(true);
            recognitionRef.current.start();

            let interimBuffer = "";

            recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                let finalTranscript = "";

                for (let i = 0; i < event.results.length; i++) {
                    const result = event.results[i];
                    if (result.isFinal) {
                        finalTranscript += result[0].transcript;
                    } else {
                        interimBuffer = result[0].transcript;
                    }
                }

                setLocalMessage((prev) => `${prev} ${finalTranscript}`.trim());
            };

            recognitionRef.current.onerror = (err: Event) => {
                console.error("Speech Recognition Error:", err);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    };

    const stopListening = (): void => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };
    useEffect(() => {
        form.setFieldsValue({ message: localMessage });
    }, [localMessage, form]);

    return (
        <Form
            onFinish={() => {}}
            form={form}
            name="chat"
            className="absolute w-full px-48 bottom-2"
        >
            <div className="mb-2 px-4 h-20">
                <Row className="bg-light-bg rounded-full pl-4 flex items-center">
                    <Col xxl={21} xl={20} lg={19} md={19} sm={19} xs={19}>
                        <div className="flex items-center w-full ">
                            <div className="w-full">
                                <Input.TextArea
                                    placeholder="Enter your prompt here"
                                    maxLength={10000}
                                    className="border-none shadow-none scroll-primary bg-transparent"
                                    name="message"
                                    autoSize={{ minRows: 0, maxRows: 2 }}
                                    value={localMessage}
                                    onChange={(e) => setLocalMessage(e.target.value)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xxl={2} xl={3} lg={3} md={4} sm={4} xs={4}>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={isListening ? stopListening : startListening}
                                className={`border-none rounded-full w-[46px] h-[46px] flex items-center justify-center p-0 ${
                                    isListening ? "bg-red-500" : "bg-green-500"
                                }`}
                            >
                                <VoiceIcon height={30} width={25} />
                            </button>
                            <CustomButton
                                type="submit"
                                className="border-none rounded-full w-[46px] h-[46px] flex items-center justify-center p-0 pt-1 pl-1"
                            >
                                <SendIcon />
                            </CustomButton>
                        </div>
                    </Col>
                </Row>
            </div>
        </Form>
    );
};

export default PromptChat;
