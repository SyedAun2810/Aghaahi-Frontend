import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";
import ApiService from "@Services/ApiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Flex, Form } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatFooter from "./Components/ChatFooter";
import { CloudCog } from "lucide-react";
import { set } from "lodash";

const PromptChat = () => {
    const [form] = Form.useForm();
    const [localMessage, setLocalMessage] = useState("");
    const [payload, setPayload] = useState<any>(false); // Create state for payload
    const [listingData, setListingData] = useState<any[]>([]); // Create state for listingData
    const [paramId, setParamId] = useState<any>(); // Create state for listingData
    let { id } = useParams();
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
                console.log("Setting new conversation ID:", newId);
                window.history.replaceState(null, "", `/prompt-chat/${newId}`);
                setParamId(newId); // Update the paramId state
            }
            setIsEmptyChat(false);

            // Get the last item and update it with the response
            const updatedItem = {
                ...listingData[listingData.length - 1], // Get the last item
                response: data.data.response.response, // Replace loader with actual response
                isLoading: false, // Remove the loader
            };

            // Replace the last item in the listingData array
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

        // Add a temporary ChatContent with a loader    
        const tempId = listingData.length;
        console.log(" The id is here ", tempId);
        const tempObject = {
            id: tempId,
            conversation_id: id,
            user_prompt: localMessage,
            response: null, // No response yet
            isLoading: true, // Show loader
        };
        console.log(" The temp is here ", tempObject);

        setListingData((prev) => [...prev, tempObject]); // Add temporary ChatContent
        scrollToBottom(); // Scroll to the bottom

        setPayload(payload.message);
        console.log("Payload", payload);
        sendPromptMutate(payload); // Trigger the mutation
    }

    // const { data: conversationListing, isFetching } = useConversationListing(id);

    const { data: conversationListing, isFetching } = useConversationListing(id);

    useEffect(() => {
        console.log("Conversation Listing:", conversationListing);
        if (conversationListing) {
            setListingData(conversationListing?.data?.chat_history || []);
        }
    }, [conversationListing]);
    if (listingData?.length > 0 && listingData[0].conversation_id !== id && !isFetching) {
        setListingData([]);
    }
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
    }, [id])
    return (
        <div className="h-[100%] bg-white">
            {isFetching ? (
                // Skeleton Loader
                <div className="h-[85%] bg-white overflow-y-auto px-72 ">
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
                    <div className="h-[85%] bg-white overflow-y-auto" ref={containerRef}>
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
                isEmptyChat={isEmptyChat}
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

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    chatData.response = convertClassNameToClass(chatData.response);

    console.log(chatData.base64_image);
    return (
        <div className="p-4 bg-white px-72 my-2">
            <UserPrompt
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
                content={chatData.user_prompt}
            />

            {isLoading ? (
                <div
                    className={`p-4 animate-pulse rounded-lg my-8 ${true ? "text-left" : "text-right"
                        }`}
                >
                    <div
                        className={`h-8 bg-gray-300 rounded ${true ? "w-3/4 ml-0" : "w-3/4 ml-auto"
                            } mb-2`}
                    ></div>
                    <div
                        className={`h-8 bg-gray-300 rounded ${true ? "w-1/2 ml-0" : "w-1/2 ml-auto"
                            }`}
                    ></div>
                </div>
            ) : (
                chatData.base64_image ? (
                    <div className="h-[600px]">
                        <img
                            className="h-[400px]"
                            src={`data:image/jpeg;base64,${chatData.base64_image}`} // Removed extra `/`lkasdjlk"  /></div>
                            alt="Chat Image"
                        />
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: chatData.response }} />
                )
            )}
        </div>
    );
}

function UserPrompt({
    isExpanded,
    toggleExpand,
    content,
}: {
    isExpanded: boolean;
    toggleExpand: () => void;
    content: string;
}) {
    return (
        <div className="flex justify-end">
            <Flex className="mb-8 bg-gray-100 py-4 px-6 rounded-3xl max-w-3xl">
                <div className="whitespace-pre-wrap break-words break-all">
                    {content}
                </div>
            </Flex>
        </div>
    );
}

export const useSendPrompt = ({ onSuccess, onVerificationFail }: any) => {
    return useMutation(
        async (payload: any) => {
            console.log(payload, "Payload in useSendPrompt function");
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
    console.log(payload, "Payload in sendPrompt function");
    const response = await ApiService.post(
        `${API_CONFIG_URLS.Chatbot.ASK}`, payload
    );

    return response;
}

const useConversationListing = (id: any) => {
    return useQuery(
        [queryKeys.chat.conversation, id],
        async () => {
            console.log("Fetching conversation listing for ID:", id);
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
        console.log("GetConversationListing: ID is undefined, returning default response.");
        return { ok: true, data: { chat_history: [] } }; // Return an empty chat history
    }
    const response = await ApiService.get(`${API_CONFIG_URLS.Chatbot.HISTORY}/${id}`);
    return response;
}

export default PromptChat;
