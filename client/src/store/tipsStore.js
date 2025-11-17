import { create } from 'zustand';

export const useTipsStore = create((set, get) => ({
    tipsList: [],
    loading: false,
    error: null,

    /**
     * @param {Array} tips - רשימת הטיפים המעודכנת ממונגו (tip.content, tip.summary וכו').
     */
    setTipsList: (tips) => set({
        tipsList: tips,
        loading: false,
        error: null
    }),

    startLoading: () => set({ loading: true, error: null }),
    setErrorState: (errorMessage) => set({ loading: false, error: errorMessage }),

    getTipById: (id) => {
        return get().tipsList.find(tip => tip._id === id);
    },

    resetTips: () => set({
        tipsList: [],
        loading: false,
        error: null
    })
}));