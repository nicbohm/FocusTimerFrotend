<script setup>
import coin from '../assets/coin.svg'
import timer from '../assets/timer.svg'
import shop from '../assets/shop.svg'
import profile from '../assets/profile.svg'
import { ref } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

</script>

<template>

  <nav class="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a class="flex items-center space-x-3">

      <img :src="coin" class="h-8" alt="Coin">
      <span class="self-center font-medium font-semibold whitespace-nowrap">0 Coins</span>

      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Login</button>
        <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>

      <div class="w-full" :class="{ 'hidden': !isMenuOpen }" id="navbar-mobile">
        <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50">
          <li>
            <router-link to="/" class="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
              <img :src="timer" class="w-6 h-5 me-2" alt="Timer">
              Timer
            </router-link>
          </li>
          <li>
            <router-link to="/shop" class="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
              <img :src="shop" class="w-6 h-5 me-2" alt="Shop">
              Shop
            </router-link>
          </li>
          <li>
            <router-link to="/profile" class="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
              <img :src="profile" class="w-6 h-5 me-2" alt="Profile">
              Profile
            </router-link>
          </li>
        </ul>
      </div>

      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
          <li>
            <router-link to="/" class="text-center inline-flex items-center px-4 py-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <img :src="timer" class="w-6 h-5 me-2" alt="Timer">
              Timer
            </router-link> 
          </li>
          <li>
            <router-link to="/shop" class="text-center inline-flex items-center px-4 py-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <img :src="shop" class="w-6 h-5 me-2" alt="Shop">
              Shop
            </router-link> 
          </li>
          <li>
            <router-link to="/profile" class="text-center inline-flex items-center px-4 py-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <img :src="profile" class="w-6 h-5 me-2" alt="Profile">
              Profile
            </router-link> 
          </li>
        </ul>
      </div>
    </div>
  </nav>




</template>

<style scoped>
.test {
  color:red;
}
</style>
