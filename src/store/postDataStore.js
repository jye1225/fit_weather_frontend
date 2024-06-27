import { create } from 'zustand'

export const usePostData = create((set) => ({
  allPostsData: [],
  setPostsData: (newPosts) => set({ allPostsData: newPosts }),
  // addPostsData: (newPosts) => set((state) => ({
  //   allPostsData: [...state.allPostsData, ...newPosts]
  // })), --- 무한 스크롤용이긴 한데...
  originalData: [],
  setOriginalData: (originalData) => set({ originalData }),

  postId: '',
  setPostId: (postId) => set({ postId }),
  postDetail: [],
  setPostDetail: (postDetail) => set({ postDetail })
}))
