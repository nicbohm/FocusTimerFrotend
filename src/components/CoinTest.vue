<script setup>
import { useAuthStore } from '../stores/auth.js';
import axios from '../api.js';

const authStore = useAuthStore();

const earnCoin = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return;
    }
    try {
        await axios.post(`/me/earn`, {}, {
        headers: { Authorization: `Bearer ${token}` }
        });
        await authStore.getUser();
    } catch (error) {
        console.error('Fehler bei earnCoin:', error);
    }
}

</script>

<template>
    <button @click="earnCoin" type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
        Earn
    </button>
</template>

<style scoped>

</style>