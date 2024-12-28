import NotificationService from "@Services/NotificationService";
import { useMutation } from "@tanstack/react-query";
import { chatApiSauceInstance } from "../chat-service";
import { GENERAL_API_ERROR } from "@Constants/app";
import { API_CONFIG_URLS } from "@Constants/config";

export const useUpdateMessage = () => {
    return useMutation(
        (messageData: { chatId: number; messageId: number; content: string }) =>
            chatApiSauceInstance.patch(
                `${API_CONFIG_URLS.CHAT.UPDATE_MESSAGE}/${messageData.chatId}/messages/${messageData.messageId}`,
                { message: messageData.content }
            ),
        {
            onSuccess: async ({ ok, response, data }: any) => {
                if (ok) {
                    return data;
                }
                NotificationService.error(data?.data?.metadata?.message || GENERAL_API_ERROR);
                throw response.message;
            },
            onError: (err: any) => {
                throw err;
            }
        }
    );
};
