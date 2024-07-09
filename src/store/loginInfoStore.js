import { create } from "zustand";

const useLoginInfoStore = create((set) => ({
  userInfo: {
    userid: null,
    username: null,
    userprofile: null,
    shortBio: null,
  },

  setUserInfoAll: (id, name, profile, bio) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        userid: id,
        username: name,
        userprofile: profile,
        shortBio: bio,
      },
    })),
  setUserid: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        userid: info,
      },
    })),
  setUsername: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        username: info,
      },
    })),
  setUserprofile: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        userprofile: info,
      },
    })),
  setShortBio: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        shortBio: info,
      },
    })),
}));

export { useLoginInfoStore };
