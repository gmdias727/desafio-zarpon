<template>
  <header class="bg-lime-600 p-4">
    <div class="wrapper max-w-7xl mx-auto flex justify-between items-center">
      <div class="text-white text-lg font-bold">
        <p>Zarpon</p>
      </div>
      <nav class="hidden md:flex space-x-4">
        <RouterLink to="/" class="text-white hover:text-gray-300">Home</RouterLink>
        <RouterLink to="/about" class="text-white hover:text-gray-300">Sobre</RouterLink>
      </nav>
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isMenuOpen" class="md:hidden bg-lime-600">
      <RouterLink to="/" class="block text-white py-2 px-4 hover:bg-lime-950">Home</RouterLink>
      <RouterLink to="/about" class="block text-white py-2 px-4 hover:bg-lime-950"
        >Sobre</RouterLink
      >
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
/* Adicione estilos adicionais se necessário */
</style>
