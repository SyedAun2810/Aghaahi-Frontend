import SendIcon from "@Assets/icons/sendIcon.svg";
import VoiceIcon from "@Assets/icons/voiceIcon.svg";

import { CustomButton } from "@Components/Button";
import { Col, Form, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";

interface ChatFooterProps {
    form: any; // You can replace `any` with a more specific type for your form (e.g., `FormInstance` from 'antd')
}


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
            className="absolute w-full px-48 top-1/2"
        >
            <div className="mb-2 px-4 h-20">
                <Row className="bg-light-bg rounded-full pl-4 flex items-center h-36">
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

export default ChatFooter;