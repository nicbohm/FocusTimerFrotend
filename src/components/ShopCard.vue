<script setup>
import ShopButton from '../components/ShopButton.vue';
import Baum_Christmas from '../assets/Baum_Christmas.png';
import Baum_Default from '../assets/Baum_Default.png';
import Baum_Apple from '../assets/Baum_Apple.png';

const props = defineProps(['p', 'fetchProducts']);

const emits = defineEmits(['updatePaymentStatus']);
const handlePaymentStatus = (status) => {
  emits('updatePaymentStatus', status);
};

// Objektmap mit Bildpfaden für verschiedene Produkte erstellen
const imagePaths = {
  'Baum_Christmas': Baum_Christmas,
  'Baum_Default': Baum_Default,
  'Baum_Apple': Baum_Apple,
  // Weitere Bildpfade hier hinzufügen...
};
const imagePath = imagePaths[props.p.product.imagePath];
</script>

<template>
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img v-if="props.p.product.type === 'Foreground'" :src="imagePath" class="h-64 p-7 rounded-t-lg mx-auto" alt="Baum">
        <div v-if="props.p.product.type === 'Background'" class="h-64 p-7 rounded-t-lg mx-auto" :class="props.p.product.imagePath"></div>
        <div class="p-5">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900">{{ props.p.product.name }}</h5>
            <div class="flex items-center justify-between">
                <span v-if="props.p.product.price != 0" class="text-3xl font-bold text-gray-900">{{ props.p.product.price }} Coins</span>
                <span v-if="props.p.product.price === 0" class="text-3xl font-bold text-gray-900">Free</span>
                <ShopButton :p="props.p" :fetchProducts="props.fetchProducts" @paymentStatus="handlePaymentStatus"/>
            </div>
        </div>
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