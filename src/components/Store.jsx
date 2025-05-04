import { create } from "zustand";
import { persist } from "zustand/middleware";
const useUserStore = create(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      setToken: (tokenData) => {
        set({ token: tokenData });

        setTimeout(() => {
          set({ token: null });
        }, 10000);
      },
      setUserInfo: (userInfoData) => {
        set({ userInfo: userInfoData });
      },
    }),
    {
      name: "userData",
    }
  )
);

export default useUserStore;
