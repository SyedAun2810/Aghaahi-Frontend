import { useMutation } from "@tanstack/react-query";

import NotificationService from "@Services/NotificationService";
import { notificationListingService } from "@Api/notification-listing";
import { queryClient } from "@Api/Client";

const STATUS_UPDATE_SUCCESS_MESSAGE = "Notification status has been updated successfully.";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}

export const useToggleNotifications = () => {
    return useMutation((id: number) => notificationListingService.notificationUpdate(), {
        onSuccess: ({ ok, response, data }: loginTypes) => {
            if (ok) {
                NotificationService.success(STATUS_UPDATE_SUCCESS_MESSAGE);
                queryClient.invalidateQueries(["USER_DETAIL"]);
                return;
            }
            NotificationService.error(data?.data?.metadata?.message);
            throw response.message;
        },
        onError: (err: any) => {
            throw err;
        }
    });
};
