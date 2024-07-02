// Chae ver
// import { create } from 'zustand'

// export const useLoginInfoStore = create((set) => ({
//   userInfo: null,
//   setUserInfo: (info) => set({ userInfo: info }),
// }))
// =======

import { create } from "zustand";

const useLoginInfoStore = create((set) => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),
}));

export { useLoginInfoStore };
