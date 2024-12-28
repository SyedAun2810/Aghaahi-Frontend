import ApiService from "./ApiService";
import NotificationService from "./NotificationService";

export async function request({
  url, //Service url
  method, //Web Service type 'post,get,put,delete....'
  params, //Paramter for request
  config = {}, //APIrequest Configuration
  showSuccessToast = false,
  showErrorToast = false,
  successMessage = "Request Successful!",

  responseType = "json",
}: any) {
  const response =
    (await ApiService[method]?.(url, params, { ...config, responseType })) ||
    {};
  if (response.ok) {
    showSuccessToast && NotificationService.success(successMessage);
    return response.data;
  } else {
    showErrorToast && NotificationService.error(response.data.message);
    throw response;
  }
}
