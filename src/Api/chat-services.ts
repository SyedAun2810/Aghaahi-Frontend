import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";

export const ChatApiService = {
    sendMessage: (payload: { message: string }) => {
        return ApiService.post(API_CONFIG_URLS.Chatbot.PUBLIC_CHAT, payload);
    }
}; 