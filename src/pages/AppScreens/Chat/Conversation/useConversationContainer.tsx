import { useEffect, useRef, useState } from "react";

import utilService, {
    updatedMessageDataOnDelete,
    updatedMessageDataOnUpdate
} from "@Utils/utils.service";
import SocketIO from "@Services/socket-service";
import { updateUnreadMsgCount } from "../utils";
import { uploadOnS3 } from "../uploadMediaUtils";
import { ChatAllowedFileTypes } from "@Constants/chat";
import {
    AttachmentType,
    DeleteMessageParamTypes,
    DeleteMessageResponseDataType,
    EditMessageDataTypes,
    MessageAttachment,
    MessageClickHandlerParamTypes,
    UpdateMessageResponseDataType
} from "../types";
import NotificationService from "@Services/NotificationService";
import { useUploadChatDocuments } from "../Queries/useUploadChatDocuments";
import { checkFileValidity, getFileType } from "@Services/fileUploadService";
import { useGetChatParticipantOnlineStatus } from "../Queries/useGetOnlineStatus";
import { useChatMessageListing } from "@Pages/AppScreens/Chat/Queries/ChatMessageListing";
import { useDeleteMessage } from "../Queries/DeleteMessage";
import { useUpdateMessage } from "../Queries/UpdateMessage";

let imageUniqueKey = 0;
let typingTimeOut: ReturnType<typeof setTimeout>;
const UPLOADING_FAILED_MESSAGE = "Something went wrong while uploading a file.";
const MESSAGE_DELETE_SUCCESS_MESSAGE = "Message has been deleted successfully.";
const MESSAGE_UPDATE_SUCCESS_MESSAGE = "Message has been updated successfully.";
const useConversationContainer = (chatId: number | undefined, chatListingMeta: any) => {
    const [images, setImages] = useState<MessageAttachment[]>([]);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [isMessageTypingData, setIsMessageTypingData] = useState({
        isTyping: false,
        ChatId: undefined
    });
    const [editMsgData, setEditMsgData] = useState<EditMessageDataTypes>({
        message: "",
        isEditActive: false,
        messageId: -1,
        isMessageChanging: false
    });

    const chatRef = useRef();
    const uploadRef = useRef<HTMLInputElement>(null);

    // fetching online status
    const { data: onlineStatus } = useGetChatParticipantOnlineStatus(
        {
            chatId: Number(chatId)
        },
        { enabled: Boolean(chatId) }
    );

    // handle fetch listing
    const { data, ...meta } = useChatMessageListing(
        {
            ChatId: Number(chatId)
        },
        {
            select: utilService.chatNormalizeInfiniteQuery,
            enabled: Boolean(chatId)
        }
    );

    // handle delete message
    const { mutateAsync: deleteMessage, isError: deleteMessageError } = useDeleteMessage();

    const deleteMessageHandler = async (data: DeleteMessageParamTypes) => {
        await deleteMessage(data);
        NotificationService.success(MESSAGE_DELETE_SUCCESS_MESSAGE);
    };

    // edit message handling

    const { mutateAsync: updateMessage, isError: updateMessageError } = useUpdateMessage();

    const onEditMessageClick = ({ messageId, content }: MessageClickHandlerParamTypes) => {
        setEditMsgData((prev) => ({
            ...prev,
            message: content,
            messageId,
            isEditActive: true,
            isMessageChanging: !prev.isMessageChanging
        }));
    };

    const updateMsgHandler = async (message: string) => {
        await updateMessage({
            chatId: chatId || -1,
            messageId: editMsgData.messageId,
            content: message
        });
        NotificationService.success(MESSAGE_UPDATE_SUCCESS_MESSAGE);
        setEditMsgData((prev) => ({
            ...prev,
            message: "",
            messageId: -1,
            isEditActive: false
        }));
    };

    // message and typing event listeners
    const listingEvents = () => {
        // listing for message events
        SocketIO.listen("message", (data: any) => {
            chatListingMeta.refetch();
            utilService.uploadMediaToChat(data, data.ChatId);
            SocketIO.emit(
                "read_message",
                {
                    ChatId: chatId,
                    ChatEventId: data?.Id
                },
                () => {
                    utilService.scrollBottom(chatRef);
                }
            );
        });
        // emitting the read message event when user chat box is active
        SocketIO.emit(
            "read_message",
            {
                ChatId: chatId
            },
            () => {
                updateUnreadMsgCount(Number(chatId));
            }
        );

        // listing for message typing event
        SocketIO.listen("message_typing", (data: any) => {
            clearTimeout(typingTimeOut);
            setIsMessageTypingData({ isTyping: true, ChatId: data?.ChatId });
            typingTimeOut = setTimeout(() => {
                setIsMessageTypingData((prev) => ({ ...prev, isTyping: false }));
            }, 2500);
        });
        // listing for delete events
        SocketIO.listen("delete_message", (data: DeleteMessageResponseDataType) => {
            chatListingMeta.refetch();
            updatedMessageDataOnDelete({
                messageId: Number(data.messageId),
                ChatId: Number(chatId)
            });
        });

        // listing for delete events
        SocketIO.listen("edit_message", (data: UpdateMessageResponseDataType) => {
            chatListingMeta.refetch();
            updatedMessageDataOnUpdate({
                messageId: Number(data.messageId),
                ChatId: Number(chatId),
                content: data.updatedContent
            });
        });
    };

    // listing for events
    useEffect(() => {
        if (!chatId) return;
        meta.refetch();
        const socketConnectionInterval = setInterval(() => {
            if (SocketIO.socketInstance.current?.connected) {
                listingEvents();
                clearInterval(socketConnectionInterval);
            }
        }, 500);

        utilService.scrollBottom(chatRef);

        return () => {
            setImages([]);
            if (socketConnectionInterval) clearInterval(socketConnectionInterval);
            SocketIO.removeListeners([
                "message",
                "read_message",
                "delivered_message",
                "message_typing",
                "edit_message",
                "delete_message"
            ]);
        };
    }, [chatId]);

    // handling send message
    function handleSendMessage(msg: string = "") {
        let isValid = true;
        let text = msg.trim();
        if (!text && !images?.length) return;
        if (images?.length) {
            images?.forEach((image) => {
                if (!image?.MediaId) {
                    isValid = false;
                }
            });
        }
        if (!text && !isValid) return;
        setSendingMessage(true);
        if (images?.length < 4 && images?.length > 0) {
            handleIndividualMediaMessage(text);
            return;
        }
        let payload = {
            ChatId: chatId,
            Content: text,
            ...(images?.length && {
                AttachmentType: AttachmentType.Image,
                MessageAttachments: images?.map((element: any) => ({
                    Id: element?.MediaId,
                    Name: element?.file.name,
                    MediaModelType: element?.MediaModelType
                }))
            })
        };

        SocketIO.emit("message", payload, () => {
            setSendingMessage(false);
            setImages([]);
        });
    }

    function handleIndividualMediaMessage(msg: string) {
        images?.forEach((element: any, index) => {
            let isLast = index === images?.length - 1;
            SocketIO.emit(
                "message",
                {
                    ChatId: chatId,
                    Content: isLast ? msg : "",
                    AttachmentType: AttachmentType.Image,
                    MessageAttachments: [
                        {
                            Id: element?.MediaId,
                            Name: element?.file.name,
                            MediaModelType: element?.MediaModelType
                        }
                    ]
                },
                () => {
                    if (!isLast) return;
                    setSendingMessage(false);
                    setImages([]);
                }
            );
        });
    }

    // uploading media
    const { mutateAsync: uploadChatDocument, isLoading: isUploadingChatDocument } =
        useUploadChatDocuments();

    function onAttachmentClick() {
        uploadRef.current.click();
    }

    // image uploading
    async function handleAttachmentChange({ target: { files } }) {
        if (Object.keys(files)?.length + images?.length > 10) {
            NotificationService.error(`You can upload only 10 files.`);
            return;
        }
        const filesInArray: File[] = Object.values(files) ?? [];
        let isValid = checkFileValidity({
            filesInArray,
            allowedFileTypes: ChatAllowedFileTypes["other"],
            limit: 10,
            value: images
        });
        const docs = filesInArray.map((file) => {
            imageUniqueKey = imageUniqueKey + 1;
            return {
                key: imageUniqueKey + 1,
                BlobUrl: URL.createObjectURL(file),
                file,
                uploading: true,
                MediaModelType: getFileType(file?.type)
            };
        });
        if (!isValid || !docs?.length) return;

        setImages((prev) => [...prev, ...docs]);

        docs.forEach(async (file, index) => {
            const [fileType, extension] = file?.file?.type.split("/");
            let res = await uploadChatDocument({
                Name: file?.file?.name,
                Size: file?.file?.size,
                MimeType: extension
            });
            if (res.ok) {
                await uploadOnS3(file?.file, res?.data);
                updateMediaState(res?.data?.MediaId, images.length + index, file?.key);
            } else {
                updateMediaState(null, images.length + index, file?.key);
            }
        });

        if (uploadRef.current) {
            uploadRef.current.value = "";
        }
    }

    // updating images state
    function updateMediaState(MediaId: number | null, index: number, key: number) {
        setImages((prev) => {
            if (prev?.length && prev.find((image) => image.key === key)) {
                let newMedia = [...prev];
                if (!MediaId) {
                    NotificationService.error(UPLOADING_FAILED_MESSAGE);
                    newMedia.splice(index, 1);
                    if (!newMedia.length) {
                        return [];
                    }
                } else {
                    newMedia.forEach((media) => {
                        if (media.key === key) {
                            media.uploading = false;
                            media.MediaId = MediaId;
                        }
                    });
                }
                return newMedia;
            } else {
                return [...prev];
            }
        });
    }

    // handling delete media
    function handleDeleteMedia(indexToDel: number) {
        let imagesWithoutDeletedImage = images.filter((_, index) => index !== indexToDel);
        setImages(imagesWithoutDeletedImage);
    }
    return {
        meta,
        images,
        chatRef,
        setImages,
        uploadRef,
        editMsgData,
        onlineStatus,
        sendingMessage,
        updateMsgHandler,
        onAttachmentClick,
        handleSendMessage,
        handleDeleteMedia,
        onEditMessageClick,
        deleteMessageHandler,
        isMessageTypingData,
        messages: data || [],
        handleAttachmentChange
    };
};

export default useConversationContainer;
