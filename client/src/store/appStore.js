import { create } from 'zustand';

const useAppStore = create((set) => ({
    termsAgreed: false,
    setTermsAgreed: (isAgreed) => set({ termsAgreed: isAgreed }),
}));

export default useAppStore;