import { ADMIN_PROFILE_RESPONSE } from "@api/response-types";
import { ChatTypeEnum } from "@constants/app.constants";

export type HandleViewMediaViewerType = (type: "document" | "other") => void;

export type MessageItemProps = {
    item: Message;
    prev: Message | null;
    next: Message | null;
    chatId: number;
    onEditMessageClick: (data: MessageClickHandlerParamTypes) => void;
    deleteMessageHandler: (data: DeleteMessageParamTypes) => void;
};
export type ChatBoxProps = {
    meta: any;
    messages: Message[];
    currentChatHeader: ChatHeaderDataType;
    scrollBoxRef: React.RefObject<HTMLElement | null>;
    chatId: number;
    onEditMessageClick: (data: MessageClickHandlerParamTypes) => void;
    deleteMessageHandler: (data: DeleteMessageParamTypes) => void;
};

export type ChatHeaderProps = {
    onlineStatus?: {
        IsOnline: boolean;
        LastSeen: string;
    };

    chatHeaderData: ChatHeaderDataType[];
    setChatType: (chatType: ChatTypeEnum) => void;
    currentChatType: ChatTypeEnum;
};

export type ReplyConfigType = {
    open: boolean;
    messageData: Message | null;
};

export type RenderAvatarProps = {
    avatars: string | string[];
    isMainProfile?: boolean;
};

export type ChatHeaderDataType = {
    avatars: string | string[];
    title: string;
    subTitle: string;
    participantIds: string | string[];
};

export type MediaMessageProps = {
    docs: any[];
    handleViewMedia: (index: any[]) => void;
    background: string;
    message: string;
    color: string;
    borderRadius: string;
    marginKey: string;
};
export enum UploadDocumentTypes {
    Image = 0,
    Video = 1,
    Pdf = 2,
    Audio = 3,
    Document = 4,
    Archive = 5,
    Text = 6
}
export const enum ParticipantTypeEnum {
    SPECTATE = 3,
    EMPLOYEE = 2,
    CUSTOMER = 1
}

export enum MediaModelType {
    Image = 1,
    Video = 3,
    Audio = 4,
    Document = 5
}

export enum ChatMediaType {
    image = 0,
    video = 1,
    audio = 3,
    application = 2
}

export enum ChatEventType {
    Text = 1,
    Attachment = 2,
    DocumentAttachment = 3,
    VoiceNote = 4,
    Image = 5,
    Video = 6,
    Call = 11
}

export type ChatUser = {
    Id: number;
    Title: string;
    Type: number;
    ChatParticipantId: number;
    UserId: number;
    FullName: string;
    ProfilePicture: string;
    UnreadCount: number;
    IsOnline: boolean;
    IsDisabled: boolean;
    LastMessage: Message;
    color: string;
};

export type MessageEventInfos = {
    UserId: number;
    Reaction: string;
    DeliveredAt: string;
    ReadAt: string;
    IsDelivered: boolean;
    IsRead: boolean;
};
export type Message = {
    MessageEventInfos: MessageEventInfos[];
    Content: string;
    ChatEventType: number;
    DateTime: string;
    Id: number;
    UserId: number;
    UserName: string;
    IsSelf: boolean;
    MessageAttachments: MessageAttachment[];
    RepliedToChatEvent?: Message;
};

export type MessageAttachment = {
    BlobUrl: string;
    ThumbnailBlobUrl: string;
    MediaModelType: MediaModelType;
};

export enum AttachmentType {
    Other = 1,
    Document = 2,
    Video = 3,
    Image = 4,
    VoiceNote = 5
}
export interface Chat {
    ChatListing: ChatUser[];
    ChatMessageListing: Message[];
}

export type ChatFooterProps = {
    sendMessage: (message: string, reply?: MessageAttachment[] | null) => void;
    uploading?: boolean;
    sendingMessage?: boolean;
    fromViewer?: boolean;
    replyConfig?: ReplyConfigType;
    closeReply?: () => void;
    images: MessageAttachment[];
    setImages: (images: MessageAttachment[]) => void;
    chatId: number | undefined;
    chatRef: any;
    onUploadMedia: () => void;
    imageDeleteHandler: (index: number) => void;
    editMsgData: EditMessageDataTypes;
    updateMsgHandler: (data: string) => void;
};

export interface ChatEventListingResponse {
    Id: number;
    UserId: string;
    Content: string;
    ChatEventType?: ChatEventType;
    MessageAttachments: {
        BlobUrl: string;
        ThumbnailBlobUrl?: string;
        MediaModelType: MediaModelType;
        Name?: string;
        Id: number;
    }[];
    DateTime: Date;
    UserName: string;
    IsSelf: boolean;
    RepliedToChatEventId?: number;
    RepliedToChatEvent?: ChatEventListingResponse;
    MessageEventInfos?: {
        UserId: string;
        Reaction: string;
        DeliveredAt: Date;
        ReadAt: Date;
        IsDelivered: boolean;
        IsRead: boolean;
    }[];
}
export type DeleteMessageParamTypes = {
    chatId: number;
    messageId: number;
};

export type DeleteMessageResponseDataType = {
    deletedAt: string;
    messageId: string;
    senderId: number;
};

export type MessageClickHandlerParamTypes = {
    messageId: number;
    content: string;
};

export type UpdateMessageResponseDataType = {
    messageId: string;
    updatedContent: string;
    updatedAt: string;
    senderId: number;
};

export type EditMessageDataTypes = {
    message: string;
    isEditActive: boolean;
    messageId: number;
    isMessageChanging: boolean;
};
