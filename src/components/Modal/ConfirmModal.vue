<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Confirmar Exclusão</h2>
      <p class="mb-4">Tem certeza de que deseja excluir este usuário?</p>
      <div class="flex justify-end">
        <button @click="$emit('cancel')" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">
          Cancelar
        </button>
        <button @click="$emit('confirm')" class="bg-red-500 text-white px-4 py-2 rounded">
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
