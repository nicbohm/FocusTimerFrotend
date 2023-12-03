// AuthProvider.js

import { reactive, provide, ref } from 'vue';
import { setToken, getToken } from './AuthHelper.js';
import axios from '../api.js';

export const setupAuthProvider = () => {
  const userData = reactive({});
  const isLoading = ref(false);

  const fetchLoggedInUser = async (token) => {
    isLoading.value = true;
    try {
        const response = await axios.get(`/me/`, {
        headers: { Authorization: `Bearer ${token}` },
        });

      Object.assign(userData, response.data);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const submit = async (data) => {
    isLoading.value = true;
    try {
      const response = await axios.post('/auth/login', data);
      const token = response.data;

      setToken(token);

      return true; // Erfolgreicher Login
    } catch (error) {
      return false; // Login-Fehler
    } finally {
      isLoading.value = false;
    }
  };

  const authToken = getToken();
  if (authToken) {
    fetchLoggedInUser(authToken);
  }

  return {
    userData,
    isLoading,
    submit
  };
};
