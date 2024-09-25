<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center border hover:border-blue-300 space-x-4 focus:outline-none cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200 hover:shadow-lg"
    >
      <img src="/profile.webp" alt="User Avatar" class="w-10 h-10 rounded-full" />
      <span class="text-gray-700">Gabriel</span>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95"
    >
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
        <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Perfil</a>
        <a href="/settings" class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >Configurações</a
        >
        <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sair</a>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}
</script>
