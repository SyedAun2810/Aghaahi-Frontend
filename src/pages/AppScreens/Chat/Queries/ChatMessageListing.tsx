import { useInfiniteQuery } from "@tanstack/react-query";

import utilService from "@Utils/utils.service";
import { queryKeys } from "@Constants/queryKeys";
import { API_CONFIG_URLS } from "@Constants/config";
import NotificationService from "@Services/NotificationService";
import { chatApiSauceInstance } from "@Pages/AppScreens/Chat/chat-service";
import { ChatEventListingResponse } from "../types";

const CHAT_URL = "/chat";
export function useChatMessageListing(payload: any, options?: {}) {
    return useInfiniteQuery<ChatEventListingResponse>(
        [...queryKeys.chat.chatListing, payload],
        async ({ pageParam = null }) => {
            const { data } = await chatApiSauceInstance.post(API_CONFIG_URLS.CHAT.CHAT_LISTING, {
                ...payload,
                BeforeCreatedAt: pageParam
            });
            if (data?.Message) {
                NotificationService.error(data?.Message);
                utilService.redirectTo(CHAT_URL);
            }
            return data as any;
        },
        {
            getNextPageParam: (lastPage: any) => {
                if (lastPage?.hasNextPage) {
                    return lastPage?.Data?.[lastPage?.Data?.length - 1]?.DateTime;
                }
            },
            staleTime: Infinity,
            cacheTime: Infinity,
            keepPreviousData: false,
            ...options
        }
    );
}
