<script setup>
import coin from '../assets/coin.svg'
import timer from '../assets/timer.svg'
import shop from '../assets/shop.svg'
import profile from '../assets/profile.svg'
import arrow from '../assets/arrow.svg'
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth.js';

const authStore = useAuthStore();
onMounted(async () => {
  await authStore.getUser();
})

// User Dropdown
const isUserDropdownOpen = ref(false)
const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

// Mobile Menu
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const checkWindowSize = () => {
  if (window.innerWidth > 768) { // 768px ist ein typischer Schwellenwert für mobile Ansichten
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', checkWindowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkWindowSize)
})

</script>

<template>
  <nav class="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a class="flex items-center space-x-3">
        <img :src="coin" class="h-8" alt="Coin">
        <span v-if="authStore.user" class="self-center font-medium font-semibold whitespace-nowrap">{{ authStore.user.coins }} Coins</span>
        <span v-else class="self-center font-medium font-semibold whitespace-nowrap">0 Coins</span>
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0">
        <router-link v-if="!authStore.user" to="/login" class="font-medium text-sm md:px-4 sm:px-2 py-2 text-center text-gray-900">Login</router-link>
        <router-link v-if="!authStore.user" to="/register" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Registrieren</router-link>
        <div v-if="authStore.user" class="flex justify-end inline-block text-left">
          <button @click="toggleUserDropdown" class="rounded-lg text-sm px-4 py-2 inline-flex w-full justify-center items-center font-medium text-sm md:px-4 sm:px-2 py-2">
            {{ authStore.user.userName }}
            <img :src="arrow" class="ml-2 h-3 w-3" alt="Arrow">
          </button>
          <div v-if="isUserDropdownOpen" class="absolute w-56 mt-14 text-base list-none bg-white divide-y divide-gray-200 rounded-lg shadow">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900">{{ authStore.user.email }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <button @click="authStore.logoutUser(); toggleUserDropdown()" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      <div class="w-full" :class="{ 'hidden': !isMenuOpen }" id="navbar-mobile">
        <ul class="flex flex-col font-medium mt-4 rounded-lg">
          <li>
            <router-link to="/" @click="toggleMenu" class="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
              <img :src="timer" class="w-6 h-5 me-2" alt="Timer">
              Timer
            </router-link>
          </li>
          <li>
            <router-link to="/shop" @click="toggleMenu" class="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
              <img :src="shop" class="w-6 h-5 me-2" alt="Shop">
              Shop
            </router-link>
          </li>
          <li>
            <router-link to="/profile" @click="toggleMenu" class="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
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

</style>
