import { useMutation, useQuery } from "@tanstack/react-query";

import { ResponseType } from "@Constants/types";
import { AuthApiService } from "@Api/auth-service";
import NotificationService from "@Services/NotificationService";
import { ResetPasswordPayload, forgotPasswordPayload } from "../types";

export const useResetPassword = (onSuccess: (payload: ResetPasswordPayload) => void) => {
    return useMutation((payload: ResetPasswordPayload) => AuthApiService.resetPassword(payload), {
        onSuccess: ({ ok, response, data }: ResponseType, payload: ResetPasswordPayload) => {
            if (ok) {
                onSuccess(payload);
                NotificationService.success("Password has been reset successfully.");
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
