import { create } from 'zustand'

export const useLoginInfoStore = create((set) => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),
}))
