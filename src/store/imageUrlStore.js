import { create } from "zustand";

const useImageUrlStore = create((set) => ({
  matchingUrl: {
    tops: "",
    bottoms: "",
    outers: "",
  },
  setMatchingUrl: (newUrl) =>
    set((state) => ({
      matchingUrl: {
        ...state.matchingUrl,
        ...newUrl,
      },
    })),
}));

export default useImageUrlStore;
