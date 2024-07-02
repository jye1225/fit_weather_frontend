import { create } from "zustand";

const useLoginInfoStore = create((set) => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),
}));

export { useLoginInfoStore };
