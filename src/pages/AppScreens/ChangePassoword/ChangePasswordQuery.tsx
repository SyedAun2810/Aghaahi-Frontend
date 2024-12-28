import { useMutation } from "@tanstack/react-query";

import { ProfileApiService } from "@Api/profile-services";
import NotificationService from "@Services/NotificationService";
import { ChangePasswordPayload, ResponseType } from "@Utils/types";

export const useChangePassword = (onChangeSuccess: ()=>void) => {
    return useMutation(
        (payload: ChangePasswordPayload) => ProfileApiService.changePassword(payload),
        {
            onSuccess: ({ ok, response, data }: ResponseType) => {
                if (ok) {
                    onChangeSuccess();
                    NotificationService.success("Password changed successfully.")
                    return;
                }
                NotificationService.error(data?.data?.metadata?.message);
                throw response.message;
            },
            onError: (err: any) => {
                throw err;
            }
        }
    );
};
