import { create } from 'zustand'

export const usePostData = create((set) => ({
  //날씨패션톡 리스트용
  allPostsData: [],
  setPostsData: (newPosts) => set({ allPostsData: newPosts }),
  // addPostsData: (newPosts) => set((state) => ({
  //   allPostsData: [...state.allPostsData, ...newPosts]
  // })), --- 무한 스크롤용이긴 한데...
  originalData: [],
  setOriginalData: (originalData) => set({ originalData }),

  //상세페이지용
  postDetail: [],
  setPostDetail: (postDetail) => set({ postDetail }),

  newPostId: null,
  setNewPostId: (postId) => set({ newPostId: postId }),
  clearNewPostId: () => set({ newPostId: null }),

  isLike: false,
  setLiketoggle: (isLike) => set({ isLike }),
  likes: 0,
  setLikes: (updatelikes) => set({ likes: updatelikes }),

  originImgPath: null,
  setOriginImgPath: (path) => set({ originImgPath: path })
}))
