import { useMutation } from "@tanstack/react-query";

import { DocumentApiService } from "@Api/document-service";
import NotificationService from "@Services/NotificationService";
import { ResponseType } from "@Utils/types";

export const useUploadDocuments = () => {
    return useMutation((payload: any) => DocumentApiService.uploadDocuments(payload), {
        onSuccess: async ({ ok, response, data }: ResponseType) => {
            if (ok) {
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
