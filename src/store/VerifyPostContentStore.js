import { create } from 'zustand'

export const useVerifyPost = create((set) => ({
  postTitle: '',
  setPostTitle: (postTitle) => set({ postTitle }),
  postContent: '',
  setPostContent: (postContent) => set({ postContent }),
  titleErrMsg: '',
  setTitleErrMsg: (titleErrMsg) => set({ titleErrMsg }),
  contentErrMsg: '',
  setContentErrMsg: (contentErrMsg) => set({ contentErrMsg }),
}))
