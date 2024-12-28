import { useMutation, useQuery } from "@tanstack/react-query";

import { ResponseType } from "@Constants/types";
import { AuthApiService } from "@Api/auth-service";
import NotificationService from "@Services/NotificationService";
import {
    OtpRegisterPayload,
    OtpResetPayload,
    ResendOtpPayload,
    forgotPasswordPayload
} from "../types";

export const useResetPassOtp = (onSuccess: (data: any, payload: OtpResetPayload) => void) => {
    return useMutation((payload: OtpResetPayload) => AuthApiService.otpResetPassword(payload), {
        onSuccess: ({ ok, response, data }: ResponseType, payload: OtpResetPayload) => {
            if (ok) {
                onSuccess(data, payload);
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

export const useVerifyUserOtp = (onSuccess: (data: any, payload: OtpResetPayload) => void) => {
    return useMutation((payload: OtpRegisterPayload) => AuthApiService.otpRegisterUser(payload), {
        onSuccess: ({ ok, response, data }: ResponseType, payload: OtpResetPayload) => {
            if (ok) {
                onSuccess(data, payload);
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

export const useResendOtp = (onSuccess: () => void) => {
    return useMutation((payload: ResendOtpPayload) => AuthApiService.resendOtp(payload), {
        onSuccess: ({ ok, response, data }: ResponseType, payload: ResendOtpPayload) => {
            if (ok) {
                onSuccess();
                NotificationService.success(
                    "OTP for verification has been resent to your email successfully."
                );
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
