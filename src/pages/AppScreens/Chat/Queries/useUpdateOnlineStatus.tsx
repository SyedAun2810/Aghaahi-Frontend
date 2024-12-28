import { useMutation } from "@tanstack/react-query";

import { API_CONFIG_URLS } from "@Constants/config";
import { chatApiSauceInstance } from "@Pages/AppScreens/Chat/chat-service";

export function useUpdateOnlineStatus() {
    return useMutation(() => chatApiSauceInstance.post(API_CONFIG_URLS.CHAT.UPDATE_ONLINE_STATUS));
}
