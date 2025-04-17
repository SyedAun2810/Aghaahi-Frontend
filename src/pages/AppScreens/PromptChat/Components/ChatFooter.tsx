import SendIcon from "@Assets/icons/sendIcon.svg";
import VoiceIcon from "@Assets/icons/voiceIcon.svg";

import { CustomButton } from "@Components/Button";
import { Col, Flex, Form, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";

import Logo from "@Assets/images/logo.png";

interface ChatFooterProps {
    form: any; // You can replace `any` with a more specific type for your form (e.g., `FormInstance` from 'antd')
}

const ChatFooter: React.FC<{ form: any; localMessage: string; setLocalMessage: (message: string) => void; handleFormSubmit: (data: any) => void ; isEmptyChat: boolean}> = ({ form, localMessage, setLocalMessage, handleFormSubmit,isEmptyChat}) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const initializeRecognition = (): SpeechRecognition | null => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            return null;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";
        recognition.interimResults = true;
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents adding a new line
            form.submit(); // Triggers form submission
        }
    };
    return (

        <div className={`w-full bg-white flex items-center justify-center px-72 ${isEmptyChat ? "h-[100%] pb-64" : " h-[100px]  pt-10 "}`}>
                 <Form
            onFinish={(values) => {
                handleFormSubmit(values);
                form.resetFields();
                setLocalMessage("");
            }}
            form={form}
            name="chat"
            className={` w-full ${isEmptyChat ? "" : "bottom-4"}`}
        >
            <div className="mb-2 px-4 h-20">
                {isEmptyChat &&
                    <div>
                        <Flex className="cursor-pointer" align="center" justify="center">
                            <img
                                src={Logo}
                                className="text-main-orange h-20 w-20"
                            />
                            <h1 className="text-center my-4">Hi, I'm Aghaahi.</h1>
                        </Flex>
                    </div>}
                {
                    isEmptyChat && <h3 className="text-center my-2">What can I help with?</h3>
                }
                <Row className="bg-light-bg rounded-full pl-4 flex items-center h-20
                ">
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
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xxl={2} xl={3} lg={3} md={4} sm={4} xs={4}>
                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={isListening ? stopListening : startListening}
                                className={`border-none rounded-full w-[46px] h-[46px] flex items-center justify-center p-0 ${isListening ? "bg-red-500" : "bg-[#5950CB]"
                                    }`}
                            >
                                <VoiceIcon height={30} width={25} />
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Form>
        </div>
   
    );
};

export default ChatFooter;