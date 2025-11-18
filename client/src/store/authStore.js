import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const decodeToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return {
            userId: decoded._id,
            role: decoded.role,
            isAuthenticated: true,
        };
    } catch (error) {
        return {
            userId: null,
            role: null,
            isAuthenticated: false,
        };
    }
};

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    userId: null,
    role: null,
    isAuthenticated: !!localStorage.getItem('token'),

    login: (token) => {
        localStorage.setItem('token', token);
        const { userId, role, isAuthenticated } = decodeToken(token);
        set({ token, userId, role, isAuthenticated });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, userId: null, role: null, isAuthenticated: false });
    },

    initialize: () => {
        const token = localStorage.getItem('token');
        if (token) {
            const { userId, role, isAuthenticated } = decodeToken(token);
            set({ token, userId, role, isAuthenticated });
        }
    },

    isAdmin: () => {
        const state = useAuthStore.getState();
        return state.role === 'admin';
    },
}));

useAuthStore.getState().initialize();

export default useAuthStore;