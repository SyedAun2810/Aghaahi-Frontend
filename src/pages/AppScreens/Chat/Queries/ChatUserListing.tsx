import { useInfiniteQuery } from "@tanstack/react-query";

import { queryKeys } from "@Constants/queryKeys";
import { API_CONFIG_URLS } from "@Constants/config";
import { chatApiSauceInstance } from "@Pages/AppScreens/Chat/chat-service";
import { ChatEventListingResponse } from "../types";

export function useChatUserListing(payload: any, options?: {}) {
    return useInfiniteQuery<ChatEventListingResponse>(
        [...queryKeys.chat.userListing, payload],
        async ({ pageParam = 1 }) => {
            const { data } = await chatApiSauceInstance.post(API_CONFIG_URLS.CHAT.USER_LISTING, {
                ...payload,
                pageNumber: pageParam
            });
            return data as any;
        },
        {
            getNextPageParam: (lastPage: any) => {
                if (lastPage?.hasNextPage) {
                    return lastPage?.currentPage + 1;
                }
            },
            staleTime: Infinity,
            cacheTime: Infinity,
            keepPreviousData: false,
            ...options
        }
    );
}
