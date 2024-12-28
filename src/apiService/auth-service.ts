import { OtpRegisterPayload, OtpResetPayload, ResendOtpPayload, ResetPasswordPayload, registerPayload } from "@Pages/AuthScreens/types";
import { API_CONFIG_URLS } from "@Constants/config";
import ApiService from "@Services/ApiService";
import {
  changePasswordPayloadType,
  forgotPasswordPayload,
  loginPayload,
  refreshTokenPayload,
  updateProfilePayloadType,
} from "../utils/types";

export const AuthApiService = {
  login,
  register,
  logout,
  resendOtp,
  userDetails,
  resetPassword,
  updateProfile,
  changePassword,
  forgotPassword,
  otpRegisterUser,
  otpResetPassword,
  refreshAccessToken,
};

async function login(payload: loginPayload) {
  const response = await ApiService.post(API_CONFIG_URLS.AUTH.LOGIN, payload);
  return response;
}

async function register(payload: registerPayload) {
  const response = await ApiService.post(API_CONFIG_URLS.AUTH.REGISTER, payload);
  return response;
}


async function logout() {
  const response = await ApiService.post(API_CONFIG_URLS.AUTH.LOGOUT);
  return response;
}

async function userDetails() {
  const response = await ApiService.get(API_CONFIG_URLS.AUTH.ME);
  return response;
}

async function forgotPassword(payload: forgotPasswordPayload) {
  const response = await ApiService.post(
    API_CONFIG_URLS.AUTH.FORGOT_PASSWORD,
    payload
  );
  return response;
}

async function otpResetPassword(payload: OtpResetPayload) {
  const response = await ApiService.post(
    API_CONFIG_URLS.AUTH.VERIFY_FORGOT_OTP,
    payload
  );
  return response;
}

async function otpRegisterUser(payload: OtpRegisterPayload) {
  const response = await ApiService.post(
    API_CONFIG_URLS.AUTH.VERIFY_OTP,
    payload
  );
  return response;
}

async function resetPassword(payload: ResetPasswordPayload) {
  const response = await ApiService.post(
    API_CONFIG_URLS.AUTH.RESET_PASSWORD,
    payload
  );
  return response;
}

async function resendOtp(payload:ResendOtpPayload ) {
  const response = await ApiService.post(
    API_CONFIG_URLS.AUTH.RESEND_OTP,
    payload
  );
  return response;
}

async function updateProfile(payload: updateProfilePayloadType) {
  const response = await ApiService.put(
    API_CONFIG_URLS.AUTH.UPDATE_PROFILE,
    payload
  );
  return response;
}

async function changePassword(payload: changePasswordPayloadType) {
  const response = await ApiService.put(
    API_CONFIG_URLS.AUTH.CHANGE_PASSWORD,
    payload
  );
  return response;
}

async function refreshAccessToken(payload: refreshTokenPayload) {
  const response = await ApiService.post(
    API_CONFIG_URLS.AUTH.REFRESH_ACCESS_TOKEN,
    payload
  );
  return response;
}
