import { useMutation, useQuery } from "@tanstack/react-query";

import { ResponseType } from "@Constants/types";
import { forgotPasswordPayload } from "../types";
import { AuthApiService } from "@Api/auth-service";
import NotificationService from "@Services/NotificationService";

export const useForgotPassword = (onSuccess: (payload: forgotPasswordPayload) => void) => {
    return useMutation((payload: forgotPasswordPayload) => AuthApiService.forgotPassword(payload), {
        onSuccess: ({ ok, response, data }: ResponseType, payload: forgotPasswordPayload) => {
            if (ok) {
                onSuccess(payload);
                NotificationService.success("OTP sent to your email successfully.");
                return data;
            }
            NotificationService.error(data?.data?.metadata?.message);
            throw response.message;
        },
        onError: (err: any) => {
            throw err;
        }
    });
};
