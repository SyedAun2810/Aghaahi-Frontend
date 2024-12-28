import { useMutation } from "@tanstack/react-query";

import { ProductApiServices } from "@Api/product-services";
import NotificationService from "@Services/NotificationService";

interface loginTypes {
    ok: boolean;
    response: any;
    data: any;
}
interface PasswordVerificationTypes {
    payload: { password: string };
}
export const usePasswordVerification = ({ onSuccess }: { onSuccess: () => void }) => {
    return useMutation(
        ({ payload }: PasswordVerificationTypes) =>
            ProductApiServices.passwordVerification(payload),
        {
            onSuccess: ({ ok, response, data }: loginTypes) => {
                if (ok) {
                    onSuccess();
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
