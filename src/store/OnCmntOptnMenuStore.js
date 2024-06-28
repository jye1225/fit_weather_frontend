import { create } from 'zustand'

export const useCmntOptnMenu = create((set) => ({
  isOn: false,
  cmntOptnMenuToggle: () => set((state) => ({ isOn: !state.isOn })),
  cmntOptnMenuOn: () => set(() => ({ isOn: true })),
  cmntOptnMenuOff: () => set(() => ({ isOn: false })),
  isModalOn: false,
  modalOpen: () => set({ isModalOn: true }),
  modalOff: () => set(() => ({ isModalOn: false })),

  //댓글 입력
  cmntErrMsg: '',
  setCmntErrMsg: (err) => set({ cmntErrMsg: err }),

  //댓글 출력용 데이터
  cmntData: [],
  setCmntData: (comments) => set({ cmntData: comments })
}));