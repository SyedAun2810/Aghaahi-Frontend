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

export const useRegister = (onSuccess: (data?: any) => void) => {
    return useMutation((payload: any) => AuthApiService.register(payload), {
        onSuccess: ({ ok, response, data }: any, payload: any) => {
            if (ok) {
                NotificationService.success("Your business has been registered successfully");
                onSuccess(data?.data);
                return data;
            }
            //console.log("error", response);
            NotificationService.error(response?.message);
            throw response.message;
        },
        onError: (err: any) => {
            throw err;
        }
    });
};
