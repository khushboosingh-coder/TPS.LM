import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api.js';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(Cookies.get('accessToken') || null);
  const refreshToken = ref(Cookies.get('refreshToken') || null);
  const user = ref(null);

  if (accessToken.value) {
    try {
      user.value = jwtDecode(accessToken.value);
    } catch (e) {
      accessToken.value = null;
      refreshToken.value = null;
    }
  }

  const isAuthenticated = computed(() => !!accessToken.value);

  const setTokens = (access, refresh) => {
    accessToken.value = access;
    refreshToken.value = refresh;
    Cookies.set('accessToken', access, { expires: 7 });
    Cookies.set('refreshToken', refresh, { expires: 30 });
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        firstName,
        lastName,
      });
      setTokens(response.data.accessToken, response.data.refreshToken);
      user.value = response.data.user;
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setTokens(response.data.accessToken, response.data.refreshToken);
      user.value = response.data.user;
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  };

  const refreshAccessToken = async () => {
    try {
      const response = await api.post('/auth/refresh-token', {
        refreshToken: refreshToken.value,
      });
      accessToken.value = response.data.accessToken;
      Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
    } catch (error) {
      logout();
      throw error;
    }
  };

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated,
    register,
    login,
    logout,
    refreshAccessToken,
    setTokens,
  };
});
