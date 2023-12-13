<script setup>
import ShopCard from '../components/ShopCard.vue';
</script>

<template>
  <div class="main bg-gray-100">
    <div class="max-w-screen-xl p-4 mt-4 mx-auto">
      <h1 class="text-6xl font-bold">Shop</h1>
      <div id="productgrid" class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-14 gap-x-14 mt-10 mb-5 justify-items-center justify-center">
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>