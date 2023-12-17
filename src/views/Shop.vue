<script setup>
import ShopCard from '../components/ShopCard.vue';
import CardSkeleton from '../components/CardSkeleton.vue';
import axios from '../api.js';
import { ref } from 'vue';

const token = localStorage.getItem('authToken');
const result = ref(null);

// Popup
const popupVisible = ref(false);
const popupTitle = ref(null);
const popupText = ref(null);
const closePopup = () => {
  popupVisible.value = false;
};
const handlePaymentStatusUpdate = (status) => {
  if (status === "success") {
    popupTitle.value = "Kauf erfolgreich";
    popupText.value = "Das Produkt steht Dir jetzt zur Verfügung und kann aktiviert werden. Viel Spaß mit dem neuen Design!";
  } else if (status === "error") {
    popupTitle.value = "Kauf fehlgeschlagen";
    popupText.value = "Leider konnten wir Dir das Produkt nicht gutschreiben. Du hast wahrscheinlich nicht genug Münzen.";
  }
  popupVisible.value = true;
};

// Products
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
        <ShopCard v-for="(product) in result.data" :p="product" :fetchProducts="fetchProducts" @updatePaymentStatus="handlePaymentStatusUpdate"/>
      </div>
    </div>
  </div>
  <div id="popup" v-if="popupVisible" tabindex="-1" class="fixed left-0 right-0 z-20 h-full justify-center items-center flex" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="p-4 max-w-lg h-auto">
      <div class="p-4 md:p-8 bg-white rounded-lg shadow">
          <h3 class="mb-3 text-2xl font-bold text-gray-900">{{ popupTitle }}</h3>
          <p class="text-gray-500 font-light text-sm mb-4">{{ popupText }}</p>
          <div class="flex justify-end">
          <button @click="closePopup" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Bestätigen</button>
          </div>
      </div>
      </div>
  </div>
</template>

<style scoped>

</style>