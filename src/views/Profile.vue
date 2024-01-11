<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../stores/auth.js';
import axios from '../api.js';
import timer from '../assets/timer.svg';
import profile from '../assets/profile.svg';

const authStore = useAuthStore();

const intervals = ref(null);
const token = localStorage.getItem('authToken');

const updateform = ref({
  username: "",
  email: "",
  password: "",
  newpassword: "",
  delete: false,
});

// Initialisiere updateform mit den aktuellen Benutzerdaten
updateform.value.username = authStore.user?.userName;
updateform.value.email = authStore.user?.email;
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    updateform.value.username = newUser.userName || "";
    updateform.value.email = newUser.email || "";
  }
});

// Intervals
const fetchIntervals = async () =>  {
  axios.get(`/intervals/all`, {
  headers: { Authorization: `Bearer ${token}` }
  }).then(data => intervals.value = data);
};
fetchIntervals();

const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', options);
}

</script>

<template>
  <div v-if="authStore.user" class="main bg-gray-100">
    <div class="max-w-screen-xl p-4 mt-4 mx-auto">
      <h1 class="text-6xl font-bold">Profile</h1>
        <div class="w-full mt-10 bg-white border border-gray-200 rounded-lg shadow">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Persönliche Daten
            </h1>
            <div v-if="authStore.authError" class="text-red-500" role="alert">
                Es ist ein Fehler aufgetreten. Bitte überprüfe Deine Eingaben.
            </div>
            <form @submit.prevent="authStore.updateUser(updateform)" class="space-y-4 md:space-y-6">
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Benutzername</label>
                    <input v-model="updateform.username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Benutzername" />
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">E-Mail</label>
                    <input v-model="updateform.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Passwort</label>
                    <input v-model="updateform.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Neues Passwort <span class="text-xs font-normal italic">(optional)</span></label>
                    <input v-model="updateform.newpassword" type="password" name="newpassword" id="newpassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                </div>
              </div>
               <div>
                <label class="relative inline-flex items-center me-5 cursor-pointer">
                  <input v-model="updateform.delete" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  <span class="ms-3 text-sm font-medium text-gray-900">Konto löschen</span>
                </label>
              </div>
              <div>
                <button type="submit" class="w-32 flex justify-center items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 text-center" :disabled="authStore.isLoading">
                  <span v-if="!authStore.isLoading">Speichern</span>
                  <div v-if="authStore.isLoading" class="h-5 w-5 ms-2 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-white"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="w-full mt-10 bg-white border border-gray-200 rounded-lg shadow">
          <div class="p-6 sm:p-8">
            <h1 class="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Erfolgreiche Intervalle
            </h1>
            <ul v-if="intervals && intervals.data.length > 0" class="divide-y divide-gray-200 mt-0">
              <li v-for="(interval) in intervals.data" class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img :src="timer" class="w-6 h-5 rounded-full" alt="Interval">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">
                          {{ interval.duration }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ formatDate(interval.date) }}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                      {{ interval.coinValue }} Coins
                    </div>
                  </div>
              </li>
            </ul>
            <p v-else>Du hast noch keine Intervalle abgeschlossen. Zeit, den Fokus zu setzen und produktiv zu werden!</p>
          </div>
        </div>
    </div>
  </div>
  <div v-if="!authStore.user" class="main bg-gray-100 justify-center items-center flex">
    <div class="p-4 md:p-8 bg-white rounded-lg shadow">
      <img :src="profile" class="w-10 mb-6" alt="profile">
      <h3 class="mb-3 text-2xl font-bold text-gray-900">Anmeldung erforderlich!</h3>
      <p class="text-gray-500 font-light text-sm mb-4">Betrachte Dein Profil und erfolgreiche Intervalle.</p>
      <router-link class="font-medium text-blue-600 hover:underline" to="/login">Anmelden</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>