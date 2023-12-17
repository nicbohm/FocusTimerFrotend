<script setup>
import ShopCard from '../components/ShopCard.vue';
import CardSkeleton from '../components/CardSkeleton.vue';
import axios from '../api.js';
import { ref } from 'vue';

const token = localStorage.getItem('authToken');
const result = ref(null);

const fetchProducts = async () =>  {
  axios.get(`/shop/products`, {
  headers: { Authorization: `Bearer ${token}` }
  }).then(data => result.value = data);
};
fetchProducts();
</script>

<template>
  <div class="main bg-gray-100">
    <div class="max-w-screen-xl p-4 mt-4 mx-auto">
      <h1 class="text-6xl font-bold">Shop</h1>
      <div v-if="!result" id="fallback" class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-14 gap-x-14 mt-10 mb-5 justify-items-center justify-center">
        <CardSkeleton v-for="n in 6"/>
      </div>
      <div v-if="result" id="productgrid" class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-14 gap-x-14 mt-10 mb-5 justify-items-center justify-center">
        <ShopCard v-for="(product) in result.data" :p="product" :fetchProducts="fetchProducts"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>