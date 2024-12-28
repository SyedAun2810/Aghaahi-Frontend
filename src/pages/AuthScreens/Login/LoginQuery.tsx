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

export const useLogin = ({ onSuccess, onVerificationFail }: useLoginType) => {
    return useMutation((payload: loginPayload) => AuthApiService.login(payload), {
        onSuccess: ({ ok, response, data }: loginTypes, payload: loginPayload) => {
            if (ok) {
                data?.data?.isVerified ? onSuccess(data) : onVerificationFail(payload?.email);
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
