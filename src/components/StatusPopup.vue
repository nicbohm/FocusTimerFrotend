<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useTimeStore } from '../stores/time.js'
import fail from '../assets/fail.png';
import success from '../assets/success.png';

const timeStore = useTimeStore();
const { timeInSeconds } = storeToRefs(timeStore);
const { isRunning } = storeToRefs(timeStore);

// statusPopup
const statusPopupVisible = ref(false);
const statusPopupTitle = ref(null);
const statusPopupText = ref(null);
const statusPopupImg = ref(null);
const closeStatusPopup = () => {
  statusPopupVisible.value = false;
};
const showStatusPopup = (status) => {
  if (status === 1) {
    statusPopupTitle.value = "Aufgabe abgeschlossen";
    statusPopupText.value = "Gut gemacht! Du hast die Zeit fokussiert genutzt.";
    statusPopupImg.value = success;
  } else if (status === 2) {
    statusPopupTitle.value = "Aufgabe unterbrochen";
    statusPopupText.value = "Bitte bleibe beim nächsten Mal konzentriert!";
    statusPopupImg.value = fail;
  } else {
    return;
  }
  statusPopupVisible.value = true;
};

watch(timeInSeconds, () => {
  if (timeInSeconds.value === 0) {
    showStatusPopup(1);
  }
});

document.onvisibilitychange = function() {
  if (document.visibilityState === 'hidden' && isRunning.value === true) {
    showStatusPopup(2);
    timeStore.stopTimer();
  }
};

document.addEventListener('mouseleave', e=>{
    if (isRunning.value === true) {
        showStatusPopup(2);
        timeStore.stopTimer();
    }
});
</script>

<template>
  <div id="statusPopup" v-if="statusPopupVisible" tabindex="-1" class="fixed left-0 right-0 z-20 h-full justify-center items-center flex" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="p-4 max-w-lg h-auto">
      <div class="p-4 md:p-8 bg-white rounded-lg shadow text-center">
        <img :src="statusPopupImg" class="w-48 mb-10 mx-auto" alt="status">
        <h3 class="mb-3 text-2xl font-bold text-gray-900">{{ statusPopupTitle }}</h3>
        <p class="text-gray-500 font-light text-sm mb-4">{{ statusPopupText }}</p>
        <button @click="closeStatusPopup" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Bestätigen</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
