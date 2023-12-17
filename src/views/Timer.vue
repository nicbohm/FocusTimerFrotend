<script setup>
import Baum_Default from '../assets/Baum_Default.png';
import TimerCore from '../components/TimerCore.vue';
import TimerButton from '../components/TimerButton.vue';
</script>

<template>
  <div class="main flex justify-center flex-col items-center bg-gray-100 bg-blue">
    <TimerCore/>
    <img :src="Baum_Default" class="w-64 mt-6 mb-10" alt="Baum_Default">
    <TimerButton/>
  </div>
</template>

<style scoped>
.bg-blue {
  background: rgb(0,158,227);
  background: radial-gradient(circle, rgba(0,158,227,1) 0%, rgba(0,119,187,1) 100%);
}
.bg-gold {
  background: rgb(255,215,0);
  background: radial-gradient(circle, rgba(255,215,0,1) 0%, rgba(203,151,0,1) 100%);
}
.bg-gray {
  background: rgb(123,123,123);
  background: radial-gradient(circle, rgba(123,123,123,1) 0%, rgba(64,64,64,1) 100%);
}
</style>
