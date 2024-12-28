import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";

export const DashboardApiService = { analyticalBoxes, recentOrders, recentPayouts, updateUSPSCode };

async function analyticalBoxes(queryParams: any) {
    const response = await ApiService.get(
      `${API_CONFIG_URLS.DASHBOARD.ANALYTICAL_BOX}`,
      queryParams
    );
    return response;
  }

  async function recentOrders(queryParams: any) {
    const response = await ApiService.get(
      `${API_CONFIG_URLS.DASHBOARD.RECENT_EARNINGS}`,
      queryParams
    );
    return response;
  }

  async function recentPayouts(queryParams: any) {
    const response = await ApiService.get(
      `${API_CONFIG_URLS.DASHBOARD.RECENT_PAYOUTS}`,
      queryParams
    );
    return response;
  }

  async function updateUSPSCode(payload: {code: string}) {
    const response = await ApiService.get(
      `${API_CONFIG_URLS.PAYMENT.USPS_SEND_CODE}?code=${payload.code}`,
    );
    return response;
  }