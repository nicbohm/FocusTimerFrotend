<script setup>
import up from '../assets/up.svg'
import down from '../assets/down.svg'
import { useTimeStore } from '../stores/time.js'
const timeStore = useTimeStore();
</script>

<template>
    <div class="flex items-center">
        <button v-if="!timeStore.isRunning" class="px-2 py-2" @click="timeStore.down()">
            <img :src="down" class="h-5 w-5" alt="down">
        </button>
        <h1 class="text-6xl font-bold text-white m-4">{{ timeStore.time }}</h1>
        <button v-if="!timeStore.isRunning" class="px-2 py-2" @click="timeStore.up()">
            <img :src="up" class="h-5 w-5" alt="up">
        </button>
    </div>
</template>

<style scoped>

</style>