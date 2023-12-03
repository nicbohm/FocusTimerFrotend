<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { setupAuthProvider } from '../auth/AuthProvider.js';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const { submit, isLoading } = setupAuthProvider();

    const err = ref(false);
    const data = reactive({
      email: '',
      password: ''
    });

    const onSubmit = async () => {
      const loginSuccess = await submit(data);

      if (loginSuccess) {
        err.value = false;
        await router.push('/');
      } else {
        err.value = true;
      }
    };

    return {
      data,
      submit: onSubmit,
      err,
      isLoading,
    };
  },
};
</script>

<template>
    <div class="main flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 bg-gray-100">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Anmelden bei Ihrem Konto
          </h1>
          <div v-if="err" class="text-red-500" role="alert">
            Ungültige Anmeldeinformationen. Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.
          </div>
          <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">E-Mail</label>
              <input v-model="data.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input v-model="data.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
            </div>
            <div>
              <button type="submit" class="w-full flex justify-center items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" :disabled="isLoading">
                Anmelden
                <div v-if="isLoading" class="h-5 w-5 ms-2 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-white"></div>
              </button>
            </div>
            <p class="text-sm font-light text-gray-500">
              Sie haben noch kein Konto? <router-link class="font-medium text-blue-600 hover:underline" to="/register">Registrieren</router-link>
            </p>
          </form>

            


          

        </div>
      </div>
    </div>
  </template>

<style scoped>

</style>
