import { useQuery } from "@tanstack/react-query";

import utilService from "@Utils/utils.service";
import { queryKeys } from "@Constants/queryKeys";
import { API_CONFIG_URLS } from "@Constants/config";
import { chatApiSauceInstance } from "@Pages/AppScreens/Chat/chat-service";

export function useGetChatParticipantOnlineStatus(payload: any, options?: {}) {
    return useQuery(
        [...queryKeys.chat.chatParticipantsOnlineStatus, payload],
        async () => {
            const { data } = await chatApiSauceInstance.get(
                utilService.createDynamicUrl(
                    API_CONFIG_URLS.CHAT.CHAT_PARTICIPANTS_ONLINE_STATUS,
                    payload
                )
            );
            return data as {
                IsOnline: boolean;
                LastSeen: string;
                UserId: number;
            }[];
        },
        { ...options, refetchInterval: 10000 }
    );
}
