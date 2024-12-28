export const queryKeys = {
    authQueryKeys :{
        login:["login"],
        userDetail: ["USER_PROFILE"],
        forgotPassword: ["FORGOT_PASSWORD"],
        resendOtp: ["RESEND_OTP"],
        verifyOtp: ["VERIFY_OTP"],
        resetPassword: ["RESET_PASSWORD"],
    },
    changePassword: ["CHANGE_PASSWORD"],
    productManagement: {
        categoryListing: "PRODUCT_CATEGORY_LISTING",
        subCategoryListing: "SUB_CATEGORY_LISTING",
        listing: "PRODUCT_LISTING",
        delete: "PRODUCT_DELETE",
        statusUpdate: "UPDATE_STATUS",
        details: "PRODUCT_DETAILS"
    },
    categoryManagement: {
        listing: "CATEGORY_MANAGEMENT_LISTING",
        addCategory: "ADD_CATEGORY",
        editCategory: "EDIT_CATEGORY",
        delete: "DELETE_CATEGORY"
        
    },
    orderManagement: {
        listing: "ORDER_MANAGEMENT",
        details: "ORDER_DETAILS",
        generateLabels: "GENERATE_LABELS",
        generateLabelAction: "GENERATE_LABELS_ACTION"
    },
    plan: {
        listing: "PLAN_LISTING"
    },
    bannerManagement: {
        listing: "BANNER_LISTING",
        details: "BANNER_DETAILS"
    },
    payment: {
        client_secret: "CLIENT_SECRET",
        usps_connect: "CONNECT_USPS"
    },
    lookups: {
        listing: "LOOKUP_PRODUCT_LISTING"
    },
    reviewManagement: {
        listing: "REVIEW_MANAGEMENT"
    },
    myEarningManagement: {
        listing: "EARNING_MANAGEMENT",
        payoutListing: "PAYOUT_LISTING"
    },
    chat: {
        userListing: ["CHAT", "CHAT_USER_LISTING"],
        chatListing: ["CHAT", "CHAT_MESSAGES_LISTING"],
        chatParticipantsOnlineStatus: ["CHAT", "CHAT_PARTICIPANTS_ONLINE_STATUS"],
        chatUnreadMessagesCount: ["CHAT", "UNREAD_MSGS_COUNT"],
        deleteMessage: ["CHAT", "DELETE_MESSAGE"],
    },
    dashboard: {
        analyticalBoxes: "ANALYTICAL_BOXES",
        recentOrders: "RECENT_ORDERS",
        recentPayouts: "RECENT_PAYOUTS"
    },
    notifications: {
        listing: "NOTIFICATION_LISTING",
         notificationCount: "NOTIFICATION_COUNT"
    }
}
