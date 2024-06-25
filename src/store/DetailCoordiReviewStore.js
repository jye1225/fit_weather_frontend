import { create } from 'zustand'

export const useCoordiReview = create((set) => ({
  yourState: 'VALUE',
  yourAction: (val) => set((state) => ({ yourState: state.yourState }))
}))
