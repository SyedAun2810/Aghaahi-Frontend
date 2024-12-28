import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@Constants/queryKeys";
import NotificationService from "@Services/NotificationService";
import { notificationListingService } from "@Api/notification-listing";

const GENERAL_ERROR = "Something went wrong. Please try again later.";

export function useGetNotificationCount({ onSuccess }: { onSuccess: (data: number) => void }) {
    return useQuery({
        queryKey: [queryKeys.notifications.notificationCount],
        queryFn: async () => {
            const { ok, response, data } = await notificationListingService.getNotificationCount();
            if (ok) {
                onSuccess(data);
                return data;
            }
            NotificationService.error(response?.message || GENERAL_ERROR);
            throw new Error(GENERAL_ERROR);
        },
        refetchInterval: 8000
    });
}
