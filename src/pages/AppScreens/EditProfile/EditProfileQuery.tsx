import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ResponseType } from "@Utils/types";
import { ProfileApiService } from "@Api/profile-services";
import NotificationService from "@Services/NotificationService";

export const useEditProfile = () => {
    const queryClient = useQueryClient();
    return useMutation((payload: any) => ProfileApiService.editProfile(payload), {
        onSuccess: ({ ok, response, data }: ResponseType) => {
            if (ok) {
                NotificationService.success("Profile updated successfully.");
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
