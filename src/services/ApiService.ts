import axios, { AxiosRequestConfig } from "axios";
import * as Apisauce from "apisauce"; // ✅ Fix: namespace import

import useAuthStore from "@Store/authStore";
import NotificationService from "@Services/NotificationService";
import utilService from "@Utils/utils.service";
import LocalStorageService from "./LocalStorageService";
import { AuthApiService } from "@Api/auth-service";

const UNAUTHORIZED_MSG = "You are unauthorized.";
export let requestCancelOngoing = Apisauce.CancelToken.source(); // ✅ Updated usage

const LOGIN_URL = "login";

export const apiService = {
  apiSauceInstance: Apisauce.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  }),
  post,
  get,
  put,
  patch,
  remove,
  postWithoutHandleResponse,
  handleResponse,
};

const apiServiceUnAuthorized = {
  apiSauceInstance: Apisauce.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    axiosInstance: axios,
  }),
  getUnAuthorized,
  postUnAuthorized,
  handleResponse,
};

async function get(
  url: string,
  queryParams?: any,
  axiosConfig?: AxiosRequestConfig
) {
  const response = await apiService.apiSauceInstance.get(
    url,
    queryParams,
    axiosConfig
  );
  return apiService.handleResponse(response);
}

async function getUnAuthorized(url: string, queryParams: any) {
  const response = await apiServiceUnAuthorized.apiSauceInstance.get(
    url,
    queryParams
  );
  return apiService.handleResponse(response);
}

async function postUnAuthorized(url: string, queryParams: any) {
  const response = await apiServiceUnAuthorized.apiSauceInstance.post(
    url,
    queryParams
  );
  return apiService.handleResponse(response);
}

async function post(url: string, data?: any, config?: AxiosRequestConfig) {
  const response = await apiService.apiSauceInstance.post(url, data, config);
  return apiService.handleResponse(response);
}

async function postWithoutHandleResponse(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  const response = await apiService.apiSauceInstance.post(url, data, config);
  return response;
}

async function put(url: string, data?: any, config?: any) {
  const response = await apiService.apiSauceInstance.put(url, data, config);
  return apiService.handleResponse(response);
}

async function patch(url: string, data: any, config?: AxiosRequestConfig) {
  const response = await apiService.apiSauceInstance.patch(url, data, config);
  return apiService.handleResponse(response);
}

async function remove(url: string, data?: any, config?: AxiosRequestConfig) {
  const response = await apiService.apiSauceInstance.delete(url, data, config);
  return apiService.handleResponse(response);
}

async function handleResponse(response: any) {
  const mutatedResponse = {
    ok: response.ok,
    status: response.status,
    header: response.headers,
    response: {
      code: response.status,
      message: response.data?.error?.message ?? response?.data?.message,
      errorCode: response.data?.code,
    },
  };

  const data = {
    data: response?.data?.data ?? response?.data,
    pagination: response?.data?.metadata ?? response?.metadata,
  };

  if (response.status === 401) {
    const { refreshToken, setUserAuthentication, removeUserAuthentication } =
      useAuthStore.getState();

    try {
      const response = await AuthApiService.refreshAccessToken({
        refreshToken,
      });

      if (response.status === 400) {
        NotificationService.error(UNAUTHORIZED_MSG);
        setTimeout(() => {
          removeUserAuthentication();
          utilService.redirectTo(LOGIN_URL);
        }, 1000);
      }

      setUserAuthentication(response?.data?.data);
    } catch (error) {
      console.error(error);
      removeUserAuthentication();
      utilService.redirectTo(LOGIN_URL);
    }

    LocalStorageService.clear();

    return {
      ...mutatedResponse,
      data: !utilService.isEmpty(data) ? data : null,
    };
  }

  if (response.status === 500) {
    return {
      ...mutatedResponse,
      data: !utilService.isEmpty(data) ? data : null,
    };
  }

  if (response.ok) {
    return { ...mutatedResponse, data };
  } else {
    return {
      ...mutatedResponse,
      data: !utilService.isEmpty(data) ? data : null,
    };
  }
}

apiService.apiSauceInstance.addRequestTransform(
  (request: AxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    request.headers = request.headers ?? {};
    request.headers["Authorization"] = `Bearer ${accessToken}`;

    if (Boolean(requestCancelOngoing.token.reason)) {
      requestCancelOngoing = Apisauce.CancelToken.source(); // ✅ Fixed
    }

    request.cancelToken = requestCancelOngoing.token;
  }
);

const ApiService: any = {
  post: apiService.post,
  get: apiService.get,
  patch: apiService.patch,
  put: apiService.put,
  remove: apiService.remove,
  getUnAuthorized: apiServiceUnAuthorized.getUnAuthorized,
  postUnAuthorized: apiServiceUnAuthorized.postUnAuthorized,
  postWithoutHandleResponse: apiService.postWithoutHandleResponse,
};

export default ApiService;
