import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthApiService } from "@Api/auth-service";
import { loginPayload, registerPayload } from "../types";
import NotificationService from "@Services/NotificationService";
import { register } from "module";

interface registerTypes {
    ok: boolean;
    response: any;
    data: any;
}

export const useRegister = (onSuccess: (email?: string) => void) => {
    return useMutation((payload: registerPayload) => AuthApiService.register(payload), {
        onSuccess: ({ ok, response, data }: registerTypes, payload: registerPayload) => {
            if (ok) {
                onSuccess(payload?.email);
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
