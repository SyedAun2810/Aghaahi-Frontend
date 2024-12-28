import { ReactNode } from "react";

export type loginPayload = {
  email: string;
  password: string;
  fcmToken?: string;
};

export type forgotPasswordPayload = {
  email: string;
};
 
export type otpVerificationPayload = {
  token: string;
  code: string;
};

export type listingPayloadType = {
  page?: number;
  limit?: number;
  accountAccess?: string;
  year?: string;
  country?: string;
};

export type graphPayloadTypes = {
  year: string | null;
  plans: string | null;
};

export type customerManagementPayloadType = {
  id: number;
  access: string;
};

export type updateProfilePayloadType = {
  mediaId?: number;
  name?: string;
};

export type changePasswordPayloadType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type refreshTokenPayload = {
  refreshToken: string | null;
};

export type subscriptionListingType = {
  page?: number;
  limit?: number;
};

export type subscriptionPlanPayloadType = {
  status?: string | null;
  duration?: string | null;
};

export type paymentDetailsType = {
  [key:string] : number | null | string, 
}

export interface User {
  id: number;
  isOnline: boolean;
  ProfilePicture: string;
  FullName: string;
  lastMsg: string;
  unRead: boolean;
  time: string;
  unReadMessageCount: number;
  hasAttachments: number;
}

export interface ResponseType {
  ok: boolean;
  response: any;
  data: any;
}

export type ChangePasswordPayload ={
  password:string;
  newPassword:string;
  confirmNewPassword:string;
}

export interface CompleteAddressTypes {
  city: string,
  state : string,
  zipCode : string,
  country : string
}


export interface AddProductPayloadTypes {
  
}

export type CustomModalProps = {
  children: ReactNode;
  [key: string]: any;
  footer: any; // Allows any other props to be passed
};

export type ModalMethods = {
  openModal: () => void;
  closeModal: () => void;
  canCloseModal: () => void;
  canNotCloseModal: () => void;
  afterCloseHandler?: () => void;
  bodyClass?: string;
};

export type ModalMethodsTypes ={
  children: ReactNode;
  [key: string]: any;
  footer: any; // Allows any other props to be passed
  openModal: () => void;
  closeModal: () => void;
  canCloseModal: () => void;
  canNotCloseModal: () => void;
  afterCloseHandler?: () => void;
  bodyClass?: string;
};

export type UserType = {
  email: string;
  firstName: string;
  id: string;
  image: any;
  lastName:string; 
  phoneNumber: string;
}
export type ReviewResponseType = {
  createdOn: string;
  id: number;
  ratings: number;
  text: string;
  user: UserType
}

export type ListResponseType<dataType> = {
  data: dataType[];
  metadata: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export type NOTIFICATION_DETAIL_DATA = {
  EventId: number;
  EventTitle:  string;
  FromUserId: string;
  FromUserName: string;
  FromUserImage: string;
  Code: number;
}

export type NOTIFICATION_DETAIL_RESPONSE = {
  code: number;
  id: string;
  title: string;
  body: string;
  deviceType: number;
  users: string[];
  appVersions: string[];
  createdOn: string;
  data: NOTIFICATION_DETAIL_DATA;
};


export type NOTIFICATION_LIST_RESPONSE =
  ListResponseType<NOTIFICATION_DETAIL_RESPONSE>;
export type DISPUTE_DETAIL_RESPONSE = {
  id: string;
  jobId: string;
  employeeUserProfileId: string;
  employerUserProfileId: string;
  title: string;
  description: string;
  decision: string;
  displayKey: string;
  status: number;
  userName: string;
  otherUserName: string;
  jobTitle: string;
  createdOn: string;
  closeDate: string;
  contractAmountOnHold: number;
  employee: UserResponseType;
  employer: UserResponseType;
  disputeDocuments: MediaResponse[];
};

export type UserResponseType = {
  id: string;
  userProfileId: string;
  name: string;
  email: string;
  profilePic: MediaResponse;
};

export type MediaResponse = {
  id: string;
  blobViewableUrl: string;
  thumbnailViewableUrl: string;
  name: string;
  documentId?: string;
};