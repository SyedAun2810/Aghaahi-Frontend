import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthApiService } from "@Api/auth-service";
import { loginPayload } from "../types";
import NotificationService from "@Services/NotificationService";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}
type useLoginType = {
    onSuccess: (data: any) => void;
    onVerificationFail: (data: string) => void;
};

export const useLogin = ({ onSuccess, onVerificationFail }: any) => {
    return useMutation((payload: any) => AuthApiService.login(payload), {
        onSuccess: ({ ok, response, data }: any, payload: any) => {
            if (ok) {
                onSuccess(data) 
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
