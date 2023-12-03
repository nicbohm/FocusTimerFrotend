<script setup>

</script>

<template>
    <div class="main flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 bg-gray-100">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Ein Konto erstellen
                </h1>
                <div v-if="error" class="alert_error">
                Fehler
                </div>
                <form name="basic" class="space-y-4 md:space-y-6">
                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Benutzername</label>
                        <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Benutzername" />
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">E-Mail</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                    </div>
                    <div>
                        <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Registrieren
                        <span v-if="isLoading">
                            <i class="animate-spin">Lade...</i>
                        </span>
                        </button>
                    </div>
                    <p class="text-sm font-light text-gray-500">
                        Sie haben bereits ein Konto? <router-link class="font-medium text-blue-600 hover:underline" to="/login">Anmelden</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
