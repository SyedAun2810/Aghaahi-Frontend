import Logo from "@Assets/images/logo.png";
import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";
import ApiService from "@Services/ApiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Flex, Form } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatFooter from "./Components/ChatFooter";
import { LikeOutlined, DislikeOutlined, CopyOutlined, SoundOutlined } from "@ant-design/icons";
import { useAuthLayoutContainer } from "@Layout/AuthLayout/useAuthLayoutContainer";

const PromptChat = () => {
    const [form] = Form.useForm();
    const [localMessage, setLocalMessage] = useState("");
    const { route } = useAuthLayoutContainer();
    const [payload, setPayload] = useState<any>(false); // Create state for payload


    const [listingData, setListingData] = useState<any[]>([]); // Create state for listingData
    const [lastCnoversationId, setLastConversationId] = useState<any>(); // Create state for listingData
    const [paramId, setParamId] = useState<any>(); // Create state for listingData
    //console.log("The route is here", route);

    const last = route[route.length - 1];

    // const {id} = /^\d+$/.test(last) ? parseInt(last) : null;
    const {id} = useParams();

    //console.log(id);     // let { id } = useParams();
    const [isEmptyChat, setIsEmptyChat] = useState<boolean>();
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
    }, [localMessage, listingData]);

    const { mutate: sendPromptMutate, isLoading: isGettingAskResponse } = useSendPrompt({
        onSuccess: (data: any) => {
            // If id is null, update it with the conversation ID from the response
            if (!id && data.data.response.conversation_id) {
                const newId = data.data.response.conversation_id;
                //console.log("Setting new conversation ID:", newId);
                window.history.replaceState(null, "", `/prompt-chat/${newId}`);
                setParamId(newId); // Update the paramId state
            }
            setIsEmptyChat(false);

            // Get the last item and update it with the response
            const updatedItem = {
                ...listingData[listingData.length - 1], // Get the last item
                response: data.data.response.response,
                format: data.data.response.format,
                // conversation_id : data?.data?.response?.conversation_id, // Replace loader with actual response
                isLoading: false, // Remove the loader
                isTyping: true
            };

            setLastConversationId(data.data.response.conversation_id);

            // Replace the last item in the listingsetListingDatay
            setListingData((prev) => {
                const updatedList = [...prev];
                updatedList.pop(); // Remove the last item
                updatedList.push(updatedItem); // Add the updated item
                return updatedList;
            });
            setPayload("");
        },
    });

    function handleFormSubmit(data: any) {
        const payload: any = {
            message: localMessage,
            conversation_id: id || null,
            is_new: !id,
        };

        if (lastCnoversationId != null || lastCnoversationId != undefined) {
            payload.conversation_id = lastCnoversationId;
            payload.is_new = false;
        }


        // Add a temporary ChatContent with a loader    
        const tempId = listingData.length;
        //console.log(" The id is here ", tempId);
        const tempObject = {
            id: tempId,
            conversation_id: id,
            user_prompt: localMessage,
            response: null, // No response yet
            isLoading: true, // Show loader
        };
        //console.log(" The temp is here ", tempObject);

        setListingData((prev) => [...prev, tempObject]); // Add temporary ChatContent
        scrollToBottom(); // Scroll to the bottom

        setPayload(payload.message);
        //console.log("Payload", payload);
        sendPromptMutate(payload); // Trigger the mutation
    }

    // const { data: conversationListing, isFetching } = useConversationListing(id);

    const { data: conversationListing, isFetching } = useConversationListing(id);

    useEffect(() => {
        //console.log("Conversation Listing:", conversationListing);
        if (conversationListing) {
            setListingData(conversationListing?.data?.chat_history || []);
        }
    }, [conversationListing]);

    useEffect(() => {
        if (listingData?.length > 0 && listingData[0].conversation_id !== id && !isFetching) {
            setListingData([]);
        }
    }, [id, isFetching, listingData]);

    useEffect(() => {
        if (paramId === undefined) {
            setParamId(id);
            setIsEmptyChat(true);
        }
        if (isGettingAskResponse) {
            setIsEmptyChat(false);
        }
    }, [id, isGettingAskResponse]);

    useEffect(() => {
        if (id === undefined) {
            setIsEmptyChat(true);
        } else {
            setIsEmptyChat(false);
        }
    }, [id]);

    // Clear listingData on component unmount or id change
    useEffect(() => {
        return () => {
            setListingData([]); // Clear listingData
        };
    }, [id]);

    return (
        <div className="relative h-[100%] bg-white rounded-[12px] overflow-hidden pt-2">
            <img
                src={Logo}
                alt="Watermark Logo"
                className="absolute opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2"
            />
            {isFetching ? (
                // Skeleton Loader
                <div className="h-[85%] bg-white overflow-y-auto pl-48 pr-60">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className={`p-4 animate-pulse rounded-lg my-8 ${index % 2 === 0 ? "text-left" : "text-right"
                                }`}
                        >
                            <div
                                className={`h-8 bg-gray-300 rounded ${index % 2 === 0 ? "w-3/4 ml-0" : "w-3/4 ml-auto"
                                    } mb-2`}
                            ></div>
                            <div
                                className={`h-8 bg-gray-300 rounded ${index % 2 === 0 ? "w-1/2 ml-0" : "w-1/2 ml-auto"
                                    }`}
                            ></div>
                        </div>
                    ))}
                </div>
            ) : (
                // Chat Listing
                listingData?.length > 0 && (
                    <div className="h-[82%] bg-white overflow-y-auto" ref={containerRef}>
                        {listingData.map((item: any, index: number) => (
                            <ChatContent
                                key={index}
                                chatData={item}
                                isLoading={item.isLoading}
                            />
                        ))}
                    </div>
                )
            )}
            <ChatFooter
                form={form}
                setLocalMessage={setLocalMessage}
                localMessage={localMessage}
                handleFormSubmit={handleFormSubmit}
                isEmptyChat={isEmptyChat || listingData?.length === 0}
            />
        </div>
    );
};

function ChatContent({
    chatData,
    isLoading,
}: {
    chatData: any;
    isLoading?: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [typedResponse, setTypedResponse] = useState("");
    const [typingComplete, setTypingComplete] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    // Effect for typing animation
    useEffect(() => {
        if (chatData.response !== null && chatData.response !== undefined) {
            const processedResponse = convertClassNameToClass(chatData.response);

            if (chatData.isTyping && !typingComplete) {
                setTypedResponse("");
                setTypingComplete(false);

                let i = 0;
                const fullText = processedResponse;
                const typingInterval = setInterval(() => {
                    if (i < fullText.length) {
                        setTypedResponse(fullText.substring(0, i + 1));
                        i++;
                    } else {
                        clearInterval(typingInterval);
                        setTypingComplete(true);
                    }
                }, 20); // Typing speed (ms per character)

                return () => clearInterval(typingInterval);
            } else {
                setTypedResponse(processedResponse);
                setTypingComplete(true);
            }
        }
    }, [chatData.response, chatData.isTyping, typingComplete]);

    return (
        <div className="p-4 bg-white px-48 my-2">
            <UserPrompt
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
                content={chatData.user_prompt}
            />

            {isLoading ? (
                <div className="p-4 animate-pulse rounded-lg my-8 text-left">
                    <div className="h-8 bg-gray-300 rounded w-3/4 ml-0 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2 ml-0"></div>
                </div>
            ) : chatData.format === "graph" ? (
                <div className="flex " >
                    <div className="mt-2">
                        <img src={Logo} alt="logo here" width={50} />
                    </div>
                    <div className="bg-gray-100 p-8 rounded-xl shadow-md">
                        <   div className="text-lg" dangerouslySetInnerHTML={{ __html: typedResponse }} />
                        <img
                            className="h-[400px] w-auto"
                            src={`data:image/jpeg;base64,${chatData.base64_image}`}
                            alt="Graph"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex">
                    <div className="mt-2">
                        <img src={Logo} alt="logo here" width={50} />
                    </div>
                    <div className="">
                        {typingComplete ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: chatData.response
                                        ? convertClassNameToClass(chatData.response)
                                        : "<p>No response available</p>",
                                }}
                            />
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: typedResponse }} />
                        )}
                    </div>
                </div>
            )}

            {(typingComplete || !chatData.isTyping) && (
                <div className="pl-16 flex mt-2 space-x-4">
                    <LikeOutlined
                        className="text-green-500 text-xl cursor-pointer hover:text-green-600"
                        onClick={() =>{}
                             //console.log("Liked response:", chatData.response)
                            }
                    />
                    <DislikeOutlined
                        className="text-red-500 text-xl cursor-pointer hover:text-red-600"
                        // onClick={() => //console.log("Disliked response:", chatData.response)}
                />
                    <CopyOutlined
                        className="text-blue-500 text-xl cursor-pointer hover:text-blue-600"
                        onClick={() => {
                            if (!chatData.response) {
                                console.error("No response available to copy.");
                                return;
                            }
                            const textContent = extractTextFromHTML(chatData.response); // Extract plain text
                            navigator.clipboard.writeText(textContent); // Copy plain text
                            //console.log("Copied response:", textContent);
                        }}
                    />
                    <SoundOutlined
                        className="text-purple-500 text-xl cursor-pointer hover:text-purple-600"
                        onClick={() => {
                            const textContent = chatData.response
                                ? extractTextFromHTML(chatData.response)
                                : "No response available to read.";
                            if (!textContent) {
                                console.error("No text available to read.");
                                return;
                            }
                            const utterance = new SpeechSynthesisUtterance(textContent);
                            window.speechSynthesis.speak(utterance);
                            //console.log("Reading aloud:", textContent);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

function extractTextFromHTML(htmlString: string): string {
    if (!htmlString) return ""; // Return an empty string if the input is null or undefined

    const tempElement = document.createElement("div"); // Create a temporary DOM element
    tempElement.innerHTML = htmlString; // Set the HTML content
    return tempElement.textContent || tempElement.innerText || ""; // Extract and return the plain text
}

function UserPrompt({
    isExpanded,
    toggleExpand,
    content,
    response, // Add response as a prop
}: {
    isExpanded: boolean;
    toggleExpand: () => void;
    content: string;
    response: string; // Add response type
}) {
    return (
        <div className="mb-2">
            <div className="flex justify-end">
                <Flex className="mb-8 bg-gray-100 py-4 px-6 rounded-3xl max-w-3xl">
                    <div className="whitespace-pre-wrap break-words break-all">
                        {content}
                    </div>
                </Flex>
                <div className="bg-red-200 relative">
                    <CopyOutlined
                        className="text-blue-500 text-xl cursor-pointer hover:text-blue-600 absolute bottom-2 right-4"
                        onClick={() => {
                            if (!response) {
                                console.error("No response available to copy.");
                                return;
                            }
                            const textContent = extractTextFromHTML(response); // Extract plain text
                            navigator.clipboard.writeText(textContent); // Copy plain text
                            //console.log("Copied response:", textContent);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export const useSendPrompt = ({ onSuccess, onVerificationFail }: any) => {
    return useMutation(
        async (payload: any) => {
            //console.log(payload, "Payload in useSendPrompt function");
            const response = await sendPrompt(payload); // Await the API call
            return response; // Return the response
        },
        {
            onSuccess: ({ ok, response, data }: any) => {
                if (ok) {
                    onSuccess(data); // Pass the data to the provided onSuccess handler
                }
            },
            onError: (err: any) => {
                console.error("Error in sendPrompt:", err);
                throw err;
            },
        }
    );
};

function convertClassNameToClass(htmlString: string): string {
    return htmlString.replace(/className=/g, "class=");
}

async function sendPrompt(payload: any) {
    //console.log(payload, "Payload in sendPrompt function");
    const response = await ApiService.post(
        `${API_CONFIG_URLS.Chatbot.ASK}`, payload
    );

    return response;
}

const useConversationListing = (id: any) => {
    return useQuery(
        [queryKeys.chat.conversation, id],
        async () => {
            //console.log("Fetching conversation listing for ID:", id);
            const { ok, data } = await GetConversationListing(id);
            if (ok) {
                return data;
            }
            throw new Error("Failed to fetch conversation listing");
        },
        {
            enabled: !!id, // Only run the query if `id` is defined
            staleTime: 0, // Ensure the data is always fresh
            cacheTime: 0, // Disable caching to always fetch fresh data
        }
    );
};

async function GetConversationListing(id: any) {
    if (!id) {
        //console.log("GetConversationListing: ID is undefined, returning default response.");
        return { ok: true, data: { chat_history: [] } }; // Return an empty chat history
    }
    const response = await ApiService.get(`${API_CONFIG_URLS.Chatbot.HISTORY}/${id}`);
    return response;
}

export default PromptChat;
