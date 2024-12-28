import { useQuery } from "@tanstack/react-query";

import utilService from "@Utils/utils.service";
import { queryKeys } from "@Constants/queryKeys";
import { API_CONFIG_URLS } from "@Constants/config";
import { chatApiSauceInstance } from "@Pages/AppScreens/Chat/chat-service";

export function useGetUnreadMsgsCount(payload?: any, options?: {}) {
    return useQuery(
        queryKeys.chat.chatUnreadMessagesCount,
        async () => {
            const { data } = await chatApiSauceInstance.get(
                utilService.createDynamicUrl(API_CONFIG_URLS.CHAT.GET_UNREAD_MSGS_COUNT, payload)
            );
            return data as number;
        },
        { ...options, refetchInterval: 5000 }
    );
}
