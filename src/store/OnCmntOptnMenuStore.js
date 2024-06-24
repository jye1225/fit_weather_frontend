import { create } from 'zustand'

export const useCmntOptnMenu = create((set) => ({
  isOn: false,
  cmntOptnMenuToggle: () => set((state) => ({ isOn: !state.isOn })),
  cmntOptnMenuOn: () => set(() => ({ isOn: true })),
  cmntOptnMenuOff: () => set(() => ({ isOn: false })),
  isModalOn: false,
  modalOpen: () => set({ isModalOn: true }),
  modalOff: () => set(() => ({ isModalOn: false })),
}));