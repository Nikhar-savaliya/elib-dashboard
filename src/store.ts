import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStore {
  token: string;
  updateToken: (newToken: string) => void;
}

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        updateToken: (newToken) => set({ token: newToken }),
      }),
      { name: "token-store" }
    )
  )
);

export default useUserStore;
