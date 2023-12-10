<script setup>
import Baum_Default from '../assets/Baum_Default.png'
import TimerCore from '../components/TimerCore.vue';
import TimerButton from '../components/TimerButton.vue';
</script>

<template>
  <div class="main flex justify-center flex-col items-center bg-gray-100 bg-blue-gradient">
    <TimerCore/>
    <img :src="Baum_Default" class="w-64 mt-6 mb-10" alt="Baum_Default">
    <TimerButton/>
  </div>
</template>

<style scoped>
.bg-blue-gradient {
  background: rgb(0,158,227);
  background: radial-gradient(circle, rgba(0,158,227,1) 0%, rgba(0,119,187,1) 100%);
}

</style>
