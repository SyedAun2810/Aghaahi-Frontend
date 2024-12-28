import {create} from 'apisauce';
import useAuthStore from '@Store/authStore';

import {  jsonFormatDataHeader } from '@Constants/config';

export const BASE_URL_CHAT = import.meta.env.VITE_APP_CHAT_URL;

 
 
export const chatApiSauceInstance = create({
  baseURL: BASE_URL_CHAT,
});

chatApiSauceInstance.addRequestTransform((request: any) => {
  const { chatToken } = useAuthStore.getState();
  request.headers['Authorization'] = `${chatToken}`;
  request.headers['Accept'] = jsonFormatDataHeader;
});


