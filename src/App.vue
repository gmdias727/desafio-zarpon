<script setup lang="ts">
import { RouterView } from 'vue-router';
import SideBarComponent from '@/components/SideBar/SideBarComponent.vue';
</script>

<template>
  <div class="relative flex flex-col h-screen">
    <SideBarComponent>
      <div class="flex-1 overflow-y-auto">
        <RouterView />
      </div>
    </SideBarComponent>
  </div>
</template>
