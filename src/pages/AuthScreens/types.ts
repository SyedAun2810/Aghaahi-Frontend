export type loginPayload = {
    email: string;
    password: string;
    fcmToken?: string;
  };

export type forgotPasswordPayload = {
  email:string
}

export type OtpResetPayload = {
  email:string|null,
  code:string
}

export type OtpRegisterPayload = {
  email:string|null,
  code:string,
  deviceId:string
}

export type ResendOtpPayload = {
  email:string,
}

export type ResetPasswordPayload = {
  email:string|null,
  password:string|null,
  token:string
}


interface addressObj {
  id: number;
  title: string;
  country: string;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
  street: string;
  latitude: 0;
  longitude: 0;
  fullAddress: string
}

interface storeObj {
    name: string,
    brandName: string,
    about: string,
    imageId: 0,
    address: addressObj
}

  export type registerPayload = {
    firstName: string;
    lastName: string;
    email?: string;
    password: string;
    address: addressObj;
    phoneNumber: string;
    store: storeObj;
  };

