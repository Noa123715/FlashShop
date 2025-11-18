import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from '../utils/cookieUtils';

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
    token: null,
    userId: null,
    role: null,
    isAuthenticated: null,

    login: (token) => {
        const { userId, role, isAuthenticated } = decodeToken(token);
        set({ token, userId, role, isAuthenticated });
    },

    logout: () => {
        deleteCookie('authToken');
        set({ token: null, userId: null, role: null, isAuthenticated: false });
    },

    initialize: () => {
        const token = getCookie('authToken');
        if (token) {
            const { userId, role, isAuthenticated } = decodeToken(token);
            set({ token, userId, role, isAuthenticated });
        }
    },

    isAdmin: () => {
        const state = useAuthStore.getState();
        return useAuthStore.getState().role === 'admin';;
    },
}));

useAuthStore.getState().initialize();

export default useAuthStore;