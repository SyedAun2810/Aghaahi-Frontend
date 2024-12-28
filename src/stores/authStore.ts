import { PERSIST_STORE } from "@Constants/app";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type LoginResponse = {
  isVerified:true;
  refreshToken:string;
  chatToken: string;
  refreshTokenExpiryTime:string;
  token:string;
  };

type StoreState = {
  userData: null | any;
  accessToken: null | string;
  refreshToken: null | string;
  chatToken: null | string;
  isAuth: boolean;
  isDark: boolean;
  showSidebar: boolean; 
};

type StoreAction = {
  setUserAuthentication: (data: LoginResponse) => void;
  removeUserAuthentication: () => void;
  updateUserData: (data: any) => void;
}; 

const initialState: StoreState = {
  isAuth: false,
  userData: null,
  accessToken: null,
  chatToken: null,
  refreshToken: null,
  isDark: false,
  showSidebar: false,
};

const useAuthStore = create<StoreState & StoreAction>()(
  persist(
    (set) => ({
      ...initialState,
      setUserAuthentication: (payload: LoginResponse) =>
        set(() => ({
          isAuth: true,
          accessToken: payload?.token,
          chatToken: payload?.chatToken,
          refreshToken: payload?.refreshToken,
          // userData: payload.user,
        })),
      removeUserAuthentication: () =>
        set(() => ({
          ...initialState,
        })),
      updateUserData: (payload: any) => set(() => ({ userData: payload })),
      toggleSidebar: () =>
        set((state) => ({ showSidebar: !state.showSidebar })),
    }),
    {
      name: PERSIST_STORE,
      partialize: ({
        isAuth,
        accessToken,
        chatToken,
        refreshToken,
        userData,
        isDark,
        showSidebar,
      }) => ({
        isAuth,
        userData,
        accessToken,
        chatToken,
        refreshToken,
        isDark,
        showSidebar, 
      }),
    }
  )
);

export default useAuthStore;