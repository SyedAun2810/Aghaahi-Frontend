export const TAB_SIZE = "980px";
export const DRAWER_WIDTH = "270px";
export const DRAWER_WIDTH_NUMBER = 270;
export const CLOSE_SIDEBAR_ON = "xl";
export const TABLE_MIN_WIDTH_ON_MOBILE = 200;
export const TABLE_MIN_WIDTH_BREAKPOINT = 768;
export const APP_NAME = "uProfyt - GM";
export const GENERAL_API_ERROR = "Something went wrong. Please try again later.";
export const DATA_KEY = "data";
export const META_DATA_KEY = "metadata";
export const GENERAL_FORMAT_DATE_ONLY = "MM/DD/YYYY";

import Hoddy from "@Assets/images/products/hoddy.png";

export type durationTypeTypes = {
  [name: string]: string;
}

export const enum SETTING_ACTIONS {
  LOGOUT = 1,
  SWITCH = 2,
}
export const enum USER_TYPE {
  APPLICANT = 1,
  FUNDER = 2,
  BOTH = 3,
}

export const MediaType = {
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  DOCUMENT: "DOCUMENT",
  ARCHIVE: "ARCHIVE",
  OTHER: "OTHER",
};

export const dateFormats = {
  US_DATE_FORMAT_SLASH: "MM/DD/YYYY",
  FORMAT: "YYYY-MM-DD",
  LONG_DATE_FORMAT: "YYYY-MM-DD HH:mm:ss",
  US_DATE_FORMAT: "MM-DD-YYYY",
  DATE_FORMAT: "MM-DD-YYYY",
  TIME: "hh:mm A",
  US_DATE_TIME_FORMAT: "MM/DD/YY - h:mm A",
  US_TIME_FORMAT: "h:mm A",
  YEAR: "YYYY",
  FORMAT_TIME_ZONE: "YYYY-MM-DDTHH:mm:ss.SSZ",
  AM_PM_FORMAT: "hh:mm a",
  TIME_ZONE_FORMAT: "YYYY-MM-DDTHH:mm:ss.SSS[Z]",
  LONG_FORMATTED_DATE: "dddd, MMMM D, YYYY",
  DAY_INITIALS: "ddd",
  DATE: "DD",
  MONTH_INITIALS: "MMM",
  SHORT_TIME_FORMAT: "h A",
  SHORT_DATE_FORMAT: "MMM DD, YYYY",
  REVERSED_FORMAT: "DD-MM-YYYY"
};

export const MediaExtensions = {
  [MediaType.IMAGE]: [".png", ".jpg", ".bmp", ".jpeg", ".gif"],
  [MediaType.VIDEO]: [".mov", ".wav", ".mp4", ".avi", ".flv", ".wav"],
  [MediaType.DOCUMENT]: [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
  [MediaType.ARCHIVE]: [".zip", ".gzip"],
  [MediaType.OTHER]: [],
};

export const BANNER_STATUS = {
  HIDE: "HIDE",
  UN_HIDE: "UN-HIDE",
};

export const BANNER_STATUS_VALUES = {
  Hide: true,
  Unhide: false,
};

export const FROM_SCREEN = {
  SIGN_UP: 1,
  FORGOT_PASSWORD: 2,
  LOGIN:3
};

export const PAGE_SIZE=10;

export const DASHBOARD_PAGE_SIZE = 3;

export const PERSIST_STORE = "PERSIST_STORE";

export const USER_ROLE = "Seller";

export const staticChat4Designs= [
  {
      "data": [
          {
              "id": 112,
              "type": "USER_EVENT",
              "chatId": 15,
              "senderId": 35,
              "content": "hello",
              "isRead": false,
              "createdAt": "2024-05-21T09:55:28.376Z",
              "updatedAt": "2024-05-21T09:55:28.376Z",
              "deletedAt": null,
              "sender": {
                  "id": 35,
                  "email": "aun@gmail.com",
                  "firstName": "aun",
                  "lastName": "muhammad",
                  "displayName": "aun muhammad",
                  "type": "USER",
                  "status": "ACTIVE",
                  "gatewayAccountId": null,
                  "gatewayAccountStatus": "INACTIVE",
                  "gatewayCustomerId": null,
                  "termAndCondition": true,
                  "isOnline": true,
                  "createdAt": "2024-05-21T09:53:19.120Z",
                  "updatedAt": "2024-05-21T10:33:33.152Z",
                  "deletedAt": null,
                  "userDetail": {
                      "id": 31,
                      "userId": 35,
                      "state": null,
                      "country": "Pakistan",
                      "city": "karachi",
                      "description": null,
                      "dob": null,
                      "phone": "+11232132323",
                      "countryCode": "us",
                      "zipCode": null,
                      "profilePictureId": null,
                      "documentId": null,
                      "createdAt": "2024-05-21T09:53:19.145Z",
                      "updatedAt": "2024-05-21T09:53:19.145Z",
                      "deletedAt": null,
                      "profilePicture": null
                  }
              },
              "attachments": [],
              "isDelivered": false,
              "sentByUser": true,
              "lastReadEventId": null,
              "lastDeliveredEventId": null
          },
          {
              "id": 111,
              "type": "USER_EVENT",
              "chatId": 15,
              "senderId": 35,
              "content": "How was the product",
              "isRead": false,
              "createdAt": "2024-05-21T09:54:02.522Z",
              "updatedAt": "2024-05-21T09:54:02.522Z",
              "deletedAt": null,
              "sender": {
                  "id": 35,
                  "email": "aun@gmail.com",
                  "firstName": "aun",
                  "lastName": "muhammad",
                  "displayName": "aun muhammad",
                  "type": "USER",
                  "status": "ACTIVE",
                  "gatewayAccountId": null,
                  "gatewayAccountStatus": "INACTIVE",
                  "gatewayCustomerId": null,
                  "termAndCondition": true,
                  "isOnline": true,
                  "createdAt": "2024-05-21T09:53:19.120Z",
                  "updatedAt": "2024-05-21T10:33:33.152Z",
                  "deletedAt": null,
                  "userDetail": {
                      "id": 31,
                      "userId": 35,
                      "state": null,
                      "country": "Pakistan",
                      "city": "karachi",
                      "description": null,
                      "dob": null,
                      "phone": "+11232132323",
                      "countryCode": "us",
                      "zipCode": null,
                      "profilePictureId": null,
                      "documentId": null,
                      "createdAt": "2024-05-21T09:53:19.145Z",
                      "updatedAt": "2024-05-21T09:53:19.145Z",
                      "deletedAt": null,
                      "profilePicture": null
                  }
              },
              "attachments": [],
              "isDelivered": false,
              "sentByUser": true,
              "lastReadEventId": null,
              "lastDeliveredEventId": null
          },
          {
            "id": 111,
            "type": "USER_EVENT",
            "chatId": 15,
            "senderId": 35,
            "content": "It was perfect",
            "isRead": false,
            "createdAt": "2024-05-21T09:54:02.522Z",
            "updatedAt": "2024-05-21T09:54:02.522Z",
            "deletedAt": null,
            "sender": {
                "id": 35,
                "email": "aun@gmail.com",
                "firstName": "aun",
                "lastName": "muhammad",
                "displayName": "aun muhammad",
                "type": "USER",
                "status": "ACTIVE",
                "gatewayAccountId": null,
                "gatewayAccountStatus": "INACTIVE",
                "gatewayCustomerId": null,
                "termAndCondition": true,
                "isOnline": true,
                "createdAt": "2024-05-21T09:53:19.120Z",
                "updatedAt": "2024-05-21T10:33:33.152Z",
                "deletedAt": null,
                "userDetail": {
                    "id": 31,
                    "userId": 35,
                    "state": null,
                    "country": "Pakistan",
                    "city": "karachi",
                    "description": null,
                    "dob": null,
                    "phone": "+11232132323",
                    "countryCode": "us",
                    "zipCode": null,
                    "profilePictureId": null,
                    "documentId": null,
                    "createdAt": "2024-05-21T09:53:19.145Z",
                    "updatedAt": "2024-05-21T09:53:19.145Z",
                    "deletedAt": null,
                    "profilePicture": null
                }
            },
            "attachments": [],
            "isDelivered": false,
            "sentByUser": false,
            "lastReadEventId": null,
            "lastDeliveredEventId": null
        },
        {
          "id": 111,
          "type": "USER_EVENT",
          "chatId": 15,
          "senderId": 35,
          "content": "",
          "isRead": false,
          "createdAt": "2024-05-21T09:54:02.522Z",
          "updatedAt": "2024-05-21T09:54:02.522Z",
          "deletedAt": null,
          "sender": {
              "id": 35,
              "email": "aun@gmail.com",
              "firstName": "aun",
              "lastName": "muhammad",
              "displayName": "aun muhammad",
              "type": "USER",
              "status": "ACTIVE",
              "gatewayAccountId": null,
              "gatewayAccountStatus": "INACTIVE",
              "gatewayCustomerId": null,
              "termAndCondition": true,
              "isOnline": true,
              "createdAt": "2024-05-21T09:53:19.120Z",
              "updatedAt": "2024-05-21T10:33:33.152Z",
              "deletedAt": null,
              "userDetail": {
                  "id": 31,
                  "userId": 35,
                  "state": null,
                  "country": "Pakistan",
                  "city": "karachi",
                  "description": null,
                  "dob": null,
                  "phone": "+11232132323",
                  "countryCode": "us",
                  "zipCode": null,
                  "profilePictureId": null,
                  "documentId": null,
                  "createdAt": "2024-05-21T09:53:19.145Z",
                  "updatedAt": "2024-05-21T09:53:19.145Z",
                  "deletedAt": null,
                  "profilePicture": null
              }
          },
          "attachments": [
            Hoddy,
            Hoddy,
            Hoddy,
            Hoddy,
            Hoddy,
            Hoddy
          ],
          "isDelivered": false,
          "sentByUser": false,
          "lastReadEventId": null,
          "lastDeliveredEventId": null
      }
      ],
      "count": 2,
      "page": 1
  }
];

export const ORDER_STATUS_OPTIONS = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "In-Process",
    value: "Inprocess",
  },
  {
    label: "Delivered",
    value: "Delivered",
  },
  {
    label: "Completed",
    value: "Completed",
  }, 
];

export const ORDER_STATUS = {
  0: {name: "Pending", bgColor: "#71717180", color: "white"},
  1: {name: "In-Process", bgColor: "#E2E2E2", color: "#717171"},
  2: {name: "Delivered", bgColor: "#00B69B1A", color: "#00B69B"},
  3: {name: "Completed", bgColor: "#00B6271A", color: "#00B628"},
  4: {name: "Dispatched", bgColor: "#F380011A", color: "#F38001"},
  5: {name: "Refunded", bgColor: "#F380011A", color: "primary.main"},
  6: {name: "Irrelevant", bgColor: "#FA513A33", color: "#000"},
}

export const REVIEWS_STARS_OPTIONS = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "1Star",
    value: "1Star",
  },
  {
    label: "2Stars",
    value: "2Stars",
  },
  {
    label: "3Stars",
    value: "3Stars",
  },
  {
    label: "4Stars",
    value: "4Stars",
  },
  {
    label: "5Stars",
    value: "5Stars",
  },
];

export const REVIEWS_STARS_KEYS = {
    "All": undefined,
    "1Star":1,
    "2Stars":2,
    "3Stars":3,
    "4Stars":4,
    "5Stars":5,
  }
  
export const BANNER_TYPES = [
  {
      value: "Product",
      label: "Product"
  },
  {
      value: "Store",
      label: "Store"
  }
];

export const BANNER_STATUS_OPTIONS = [
  {
      value: "active",
      label: "Active"
  },
  {
      value: "inactive",
      label: "In-Active"
  }
];

export const PlanType: {[num: number]: durationTypeTypes} =
{
  0: {name: "Product"},
  1: {name: "Store"},
}

export const durationType: {[num: number]: durationTypeTypes} =
{
  0: {name: "Weekly", days: "7-days"},
  1: {name: "Bimonthly", days: "14-days"},
  2: {name: "Monthly", days: "1-month"},
  3: {name: "Yearly",  days: "12-months"},
}

export const payoutStatus: string[] = ["In Process", "Paid"]

export const PROCESSING_CATEGORY_STATUS_OPTIONS = [
  {
    label: "Machinable",
    value: 0,
  },
  {
    label: "Non Machinable",
    value: 1,
  },
  {
    label: "Irregular",
    value: 2,
  },
  
];

export const PROCESSING_CATEGORY_STATUS_VALUES ={
0: "Machinable",
1: "Non Machinable",
2: "Irregular"
} 

