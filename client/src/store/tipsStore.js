import { create } from 'zustand';

export const useTipsStore = create((set) => ({
    currentTip: null,
    setCurrentTip: (tip) => set({ currentTip: tip }),

    tipsList: [],
    setTipsList: (list) => set({ tipsList: list }),
}));
