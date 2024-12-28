import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { ChangePasswordPayload } from "@Utils/types";

export const ProfileApiService = { changePassword, editProfile };

async function changePassword(payload: ChangePasswordPayload) {
    const response = await ApiService.put(API_CONFIG_URLS.PROFILE.CHANGE_PASSWORD, payload);
    return response;
}

async function editProfile(payload: ChangePasswordPayload) {
    let {chatToken, ...rest} = payload;
    const response = await ApiService.put(`${API_CONFIG_URLS.PROFILE.EDIT_PROFILE}?chatToken=${chatToken}`, rest);
    return response;
}
