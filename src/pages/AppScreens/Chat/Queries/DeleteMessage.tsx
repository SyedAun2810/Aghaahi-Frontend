import { queryKeys } from "@Constants/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { chatApiSauceInstance } from "../chat-service";
import { API_CONFIG_URLS } from "@Constants/config";
import NotificationService from "@Services/NotificationService";
import { GENERAL_API_ERROR } from "@Constants/app";

export const useDeleteMessage = () => {
    return useMutation(
        [queryKeys.chat.deleteMessage],
        (messageData: { chatId: number; messageId: number }) =>
            chatApiSauceInstance.delete(
                `${API_CONFIG_URLS.CHAT.DELETE_MESSAGE}/${messageData?.chatId}/messages/${messageData?.messageId}`
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
