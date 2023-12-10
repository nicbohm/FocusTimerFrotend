<script setup>
import { useTimeStore } from '../stores/time.js'
const timeStore = useTimeStore();
</script>

<template>
    <button v-if="!timeStore.isRunning" @click="timeStore.startTimer()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
        Starten
    </button>
    <button v-if="timeStore.isRunning" @click="timeStore.stopTimer()" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
        Stoppen
    </button>
</template>

<style scoped>

</style>