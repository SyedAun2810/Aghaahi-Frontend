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
   role: null | string,
  isOwner: boolean,
  company: null | any;
};

type StoreAction = {
  setUserAuthentication: (payload: any) => void;
  removeUserAuthentication: () => void;
  updateUserData: (payload: any) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}; 

const initialState: any = {
  isAuth: false,
  userData: null,
  accessToken: null,
  chatToken: null,
  refreshToken: null,
  isDark: false,
  showSidebar: false,
  role: null,
  isOwner: false,
  company : null
};

const useAuthStore = create<StoreState & StoreAction>()(
  persist(
    (set) => ({
      ...initialState,
      setUserAuthentication: (payload: any) =>
        set(() => ({
          isAuth: payload.isAuth,
          accessToken: payload?.token,
          role : payload?.employee?.role.name,
          isOwner: payload?.employee?.role.name === 'Owner',
          userData: payload?.employee,
          company: payload?.company,
          isDark: payload?.isDark ?? false,
        })),
      removeUserAuthentication: () =>
        set(() => ({
          ...initialState,
        })),
      updateUserData: (payload: any) => set(() => ({ userData: payload })),
      toggleSidebar: () =>
        set((state) => ({ showSidebar: !state.showSidebar })),
      toggleTheme: () => {
        set((state) => {
          const newIsDark = !state.isDark;
          // Update the DOM class
          if (newIsDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDark: newIsDark };
        });
      },
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
        isOwner, 
        company,
        role
      }) => ({
        isAuth,
        userData,
        accessToken,
        chatToken,
        refreshToken,
        isDark,
        showSidebar, 
        isOwner, 
        role,
        company,
      }),
    }
  )
);

export default useAuthStore;