<template>
  <div class="flex">
    <div
      :class="['relative transition-all duration-300', isCollapsed ? 'w-16' : 'w-64']"
      class="bg-gray-800 text-white h-screen"
    >
      <button @click="toggleCollapse" class="absolute top-2 right-2 p-2">
        <Icon :icon="isCollapsed ? 'mdi:menu' : 'mdi:menu-open'" width="24" height="24" />
      </button>
      <nav v-if="!isCollapsed" class="mt-10">
        <RouterLink to="/" class="block py-2 px-4 hover:bg-gray-700">Home</RouterLink>
        <RouterLink to="/about" class="block py-2 px-4 hover:bg-gray-700">Sobre</RouterLink>
        <RouterLink to="/settings" class="block py-2 px-4 hover:bg-gray-700"
          >Configurações</RouterLink
        >
      </nav>
    </div>
    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';

const isCollapsed = ref(true);

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
</script>
