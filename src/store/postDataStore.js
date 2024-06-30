import { create } from 'zustand'
import { url } from './ref';

export const usePostData = create((set) => ({
  //날씨패션톡 리스트용
  allPostsData: [],
  setPostsData: (newPosts) => set({ allPostsData: newPosts }),

  originalData: [],
  setOriginalData: (originalData) => set({ originalData }),

  //서버에서 날씨패션톡 게시물 데이터 가져오는 함수
  fetchPosts: async () => {
    try {
      const response = await fetch(`${url}/posts/getAllPosts`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const newPosts = data.postsList;

      set({ allPostsData: newPosts, originalData: newPosts })
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생', error);
    }
  },

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
  setOriginImgPath: (path) => set({ originImgPath: path }),
}))
