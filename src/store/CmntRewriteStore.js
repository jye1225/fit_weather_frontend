import { create } from 'zustand'

export const useCmntRewrite = create((set) => ({
  cmntRewrite: false,
  onCmntRewrite: () => set(() => ({ cmntRewrite: true })),
  offCmntRewrite: () => set(() => ({ cmntRewrite: false })),
  commentText: '',
  setCommentText: (newText) => set(() => ({ commentText: newText })),
}))
