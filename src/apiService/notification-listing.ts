import { API_CONFIG_URLS } from "@Constants/config";
import ApiService from "@Services/ApiService";

async function listings(queryParams: any) {
    const response = await ApiService.get(
      `${API_CONFIG_URLS.NOTIFICATION.LISTING}`,
      queryParams
    );
    return response;
  }

  async function notificationUpdate() {
    const response = await ApiService.patch(
        `${API_CONFIG_URLS.NOTIFICATION.UPDATE_STATUS}`
    );
    return response;
}

async function getNotificationCount() {
  const response = await ApiService.get(API_CONFIG_URLS.NOTIFICATION.COUNT);
  return response;
}


export const notificationListingService = {
    listings,
    notificationUpdate,
    getNotificationCount
}