import { createRef } from "react";
import { onlineManager } from "@tanstack/react-query";
import SocketIOClient, { Socket } from "socket.io-client";

import { BASE_URL_CHAT } from "@Pages/AppScreens/Chat/chat-service";
import useAuthStore from "@Store/authStore";

interface EventData {
    event: string;
    data: any;
}

const socketInstance = createRef<Socket<any>>();

const queue: EventData[] = [];

export const makeSocketConnection = (query?: { [key: string]: string }, onSuccess?: any) => {
    const { chatToken, userData } = useAuthStore.getState();
    if (!(socketInstance.current && socketInstance.current?.connected)) {
        const newSocketInstance = SocketIOClient(BASE_URL_CHAT, {
            path: "/socket.io",
            transports: ["websocket"],
            query: {
                ...query,
                ...(chatToken && { authorization: chatToken }),
                ...(userData?.chatUserId && { actorId: userData?.chatUserId })
            }
        });

        // @ts-ignore
        socketInstance.current = newSocketInstance;

        newSocketInstance.connect();

        newSocketInstance.on("connect", () => {
            onSuccess?.();

            console.log("connected........");
        });
    } else {
        console.log("SOCKET ALREADY CONNECTED");
    }
};

export const createOrJoinRoom = (onSuccess: (user: any) => void, config: any) => {
    if (socketInstance.current && socketInstance.current?.connected) {
        socketInstance.current.emit("chat_create_or_join", config, (users) => {
            onSuccess && onSuccess(users?.Id);
        });
    } else {
        console.log("SOCKET NOT CONNECTED");

        makeSocketConnection({}, () => {
            createOrJoinRoom(onSuccess, config);
        });
    }
};

const listen = (eventName: string, onSuccess: (data: any) => void) => {
    if (
        socketInstance.current &&
        socketInstance.current?.connected &&
        !socketInstance.current.hasListeners(eventName)
    ) {
        socketInstance.current?.on(eventName, (data: any) => {
            onSuccess && onSuccess(data);
        });
    }
};

const emit = (eventName: string, args: any, onSuccess: (data: any) => void) => {
    if (socketInstance && socketInstance.current?.connected) {
        if (onlineManager.isOnline()) {
            socketInstance.current?.emit(eventName, args, (data: any) => {
                onSuccess && onSuccess(data);
            });
        } else {
            queue.push({ event: eventName, data: args });
        }
    }
};

const emitQueue = () => {
    queue.forEach((item) => {
        emit(item.event, item.data, (data: any) => {
            console.log("emitQueue", data);
        });
    });
    queue.length = 0;
};

const disconnect = () => {
    if (socketInstance.current && socketInstance.current?.connected) {
        socketInstance.current?.disconnect();
        // @ts-ignore
        socketInstance.current = null;
    }
};

const removeListeners = (events: string[]) => {
    if (socketInstance.current && socketInstance.current?.connected) {
        events.forEach((e) => socketInstance.current?.off(e));
    }
};

const SocketIO = {
    makeSocketConnection,
    createOrJoinRoom,
    listen,
    emit,
    emitQueue,
    socketInstance: socketInstance,
    disconnect,
    removeListeners
};

export default SocketIO;
