<script setup>
import { ref } from 'vue';
import check from '../assets/check.svg';
import axios from '../api.js';

import { useAuthStore } from '../stores/auth.js'
const authStore = useAuthStore();

const props = defineProps(['p', 'fetchProducts']);

const buyProduct = async (pid) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return;
    }
    try {
        await axios.post(`/shop/buy/${pid}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
        });
        props.fetchProducts();
        await authStore.getUser();
    } catch (error) {
        console.error('Fehler bei buyProduct:', error);
    }
}

const activateProduct = async (pid) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return;
    }
    try {
        await axios.post(`/shop/activate/${pid}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
        });
        props.fetchProducts();
        await authStore.getUser();
    } catch (error) {
        console.error('Fehler bei activateProduct:', error);
    }
}

</script>

<template>
    <button @click="buyProduct(props.p.product.id)" v-if="!props.p.purchased && !props.p.active" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Kaufen</button>
    <button @click="activateProduct(props.p.product.id)" v-if="props.p.purchased && !props.p.active" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Aktivieren</button>
    <p v-if="props.p.purchased && props.p.active" class="px-5 py-2.5 flex items-center">
    <img :src="check" class="w-6 h-5 me-2" alt="Check">
    aktiv
    </p>
</template>

<style scoped>

</style>