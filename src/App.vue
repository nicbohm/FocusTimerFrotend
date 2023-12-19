<script setup>
import Navbar from './components/Navbar.vue';
import StatusPopup from './components/StatusPopup.vue';
</script>

<template>
  <Navbar/>
  <router-view/>
  <StatusPopup/>
</template>

<style scoped>

</style>
