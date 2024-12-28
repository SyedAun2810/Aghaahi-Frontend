import { UseInfiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { queryKeys } from "@Constants/queryKeys";
import { notificationListingService } from "@Api/notification-listing";

type OrderByType = "asc" | "desc";

export interface ListPayload {
    advancedSearch?: {
        fields?: string[];
        keyword?: string;
    };
    keyword?: string;
    pageNumber?: number;
    pageSize?: number;
    orderBy?: OrderByType;
    status?: number;
}

export type ListResponseType<dataType> = {
    data: dataType[];
    metadata: {
        currentPage: number;
        totalPages: number;
        pageSize: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };
};

export type NOTIFICATION_DETAIL_RESPONSE = {
    id: string;
    title: string;
    body: string;
    deviceType: number;
    users: string[];
    appVersions: string[];
    createdOn: string;
};

export type NOTIFICATION_LIST_RESPONSE = ListResponseType<NOTIFICATION_DETAIL_RESPONSE>;
export type DISPUTE_DETAIL_RESPONSE = {
    id: string;
    jobId: string;
    employeeUserProfileId: string;
    employerUserProfileId: string;
    title: string;
    description: string;
    decision: string;
    displayKey: string;
    status: number;
    userName: string;
    otherUserName: string;
    jobTitle: string;
    createdOn: string;
    closeDate: string;
    contractAmountOnHold: number;
    employee: UserResponseType;
    employer: UserResponseType;
    disputeDocuments: MediaResponse[];
};

export type UserResponseType = {
    id: string;
    userProfileId: string;
    name: string;
    email: string;
    profilePic: MediaResponse;
};

export type MediaResponse = {
    id: string;
    blobViewableUrl: string;
    thumbnailViewableUrl: string;
    name: string;
    documentId?: string;
};

export function useGetNotificationsListing(payload: ListPayload, options?: {}) {
    return useInfiniteQuery<NOTIFICATION_LIST_RESPONSE>(
        [queryKeys.notifications.listing],
        async ({ pageParam }) => {
            const { data } = await notificationListingService.listings({
                ...payload,
                pageNumber: Number(pageParam) || 1
            });
            return data as any;
        },
        {
            getNextPageParam: (lastPage: any) => {
                if (lastPage?.pagination?.hasNextPage) {
                    return lastPage?.pagination?.currentPage + 1;
                }
            },
            staleTime: Infinity,
            cacheTime: Infinity,
            keepPreviousData: false,
            ...options
        }
    );
}
