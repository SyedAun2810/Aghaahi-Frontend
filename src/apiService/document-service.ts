import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS, multiFormDataHeader } from "@Constants/config";
import { chatApiSauceInstance } from "../pages/AppScreens/Chat/chat-service";

export const DocumentApiService = { uploadDocuments, uploadChatDocuments };

async function uploadDocuments(payload: any) {
    const response = await ApiService.post(API_CONFIG_URLS.DOCUMENTS.UPLOAD_DOCUMENTS, payload,{
        ...multiFormDataHeader
    });
    return response;
}

async function uploadChatDocuments(payload: any) {
    const response = await chatApiSauceInstance.post(API_CONFIG_URLS.CHAT.UPLOAD_MEDIA, payload);
    return response;
}
