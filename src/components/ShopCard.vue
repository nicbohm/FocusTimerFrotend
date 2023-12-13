<script setup>
import Baum_Christmas from '../assets/Baum_Christmas.png'
</script>

<template>

    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img :src="Baum_Christmas" class="w-64 p-8 rounded-t-lg mx-auto" alt="Baum_Christmas">
        <div class="px-5 pb-5">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900">Weihnachtsbaum</h5>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900">60 Coins</span>
                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Kaufen</a>
            </div>
        </div>
    </div>


</template>

<style scoped>

</style>