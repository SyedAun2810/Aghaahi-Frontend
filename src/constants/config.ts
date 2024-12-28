const chatController = "chat"
const authController = "users";
const lookupsController = "lookups";
const personalController = "personal";
const sellerAuthController = "sellers";
const sellerTokenController = "tokens";
const documentController = "/documents";

export const API_CONFIG_URLS = {
  AUTH: {
    ME: `${personalController}/profile`,
    LOGIN: `${sellerTokenController}/login`,
    REGISTER: `${sellerAuthController}/register`,
    LOGOUT: `${sellerTokenController}/logout`,
    RESEND_OTP: `${authController}/resend-otp`,
    UPDATE_PROFILE: `${personalController}/update-profile`,
    RESET_PASSWORD: `${authController}/reset-password`,
    FORGOT_PASSWORD: `${authController}/forgot-password`,
    CHANGE_PASSWORD: `${authController}/change-password`,
    FORGOT_PASSWORD_VERIFICATION: `${authController}/forgot-password/verification`,
    REFRESH_ACCESS_TOKEN: `${sellerTokenController}/refresh`,
    VERIFY_FORGOT_OTP: `${authController}/verify-forget-otp`,
    VERIFY_OTP: `${authController}/verify-otp`,
  },
  PROFILE: {
    CHANGE_PASSWORD: `${personalController}/change-password`,
    EDIT_PROFILE: `${sellerAuthController}/profile`,
  },
  DOCUMENTS: {
      UPLOAD_DOCUMENTS:`${documentController}`
  },
  DASHBOARD: {
    ANALYTICAL_BOX: "/sellers/dashboard/metrics",
    RECENT_EARNINGS: "/sellers/dashboard/new-orders",
    RECENT_PAYOUTS: "/sellers/dashboard/recent-payouts"
  },
  PRODUCT: {
    ADD_PRODUCT: `/products`,
    EDIT_PRODUCT: `/products`,
    VIEW_PRODUCT: `/products`,
    PRODUCT_DETAILS: `/products`,
    DELETE_PRODUCT: `/products`
  },
  LOOKUPS:{
        CATEGORIES: `${lookupsController}/products/categories`,
        PRODUCTS: `${lookupsController}/products`
  },
  ORDER_MANAGEMENT: {
    LISTING: `/orders/management`,
    DETAIL: `/sellers/orders/`,
    GENERATE_LABELS: `/payments/shipping-packages`,
    GENERATE_LABELS_ACTION: `/payments/usps-generate-labels`
  },
  PLAN: {
    LISTING: `/plans`,
  },
  BANNER_MANAGEMENT: {
    LISTING: `/banners`,
    MAKE_REQUEST: `/banners`,
    STATUS_UPDATE: `/banners`,
    REORDER_REQUEST: `/banners`,
    REQUEST_DETAILS: `/banners/`
  },
  PAYMENT: {
    CLIENT_SECRET: `/payments/cards/setup-card-itent`,
    PASSWORD_VERIFICATION: `/personal/password-verification`,
    STRIPE_CONNECT: `/payments/account-onboarding`,
    USPS_CONNECT: `/payments/usps-account-init`,
    USPS_SEND_CODE: `/payments/usps-account-confirm`
  },
  REVIEW_MANAGEMENT: {
    LISTING: `/products/reviews`
  },
  MY_EARNING_MANAGEMENT: {
    LISTING: `/sellers/earnings`,
    PAYOUT_LISTING: `/sellers/payouts`,
    REQUEST_PAYOUT: `/sellers/payouts/request`
  },
  CHAT: {
    USER_LISTING: `${chatController}/listing`,
    CHAT_LISTING: `${chatController}/message-listing`,
    UPLOAD_MEDIA: `/media/upload-init`,
    CHAT_PARTICIPANTS_ONLINE_STATUS: `${chatController}/get-last-online-status/{chatId}`,
    UPDATE_ONLINE_STATUS: `${chatController}/update-last-online-status`,
    GET_UNREAD_MSGS_COUNT: `${chatController}/user/unread-count`,
    DELETE_MESSAGE: `server-side-socket/chats`,
    UPDATE_MESSAGE: `server-side-socket/chats`,
  },
  NOTIFICATION: {
    LISTING: `/notifications`,
    UPDATE_STATUS: `/notifications/toggle-status`,
    COUNT: `/notifications/count`
  }
};

export const multiFormDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "text/plain"
  }
};

export const jsonFormatDataHeader = 'application/json';
