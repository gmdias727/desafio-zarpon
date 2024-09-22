<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Lista de Usuários</h1>
    <button @click="openForm()" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
      Adicionar Usuário
    </button>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4">Ações</th>
            <th class="py-2 px-4">Nome</th>
            <th class="py-2 px-4">Email</th>
            <th class="py-2 px-4">Telefone</th>
            <th class="py-2 px-4">CPF/CNPJ</th>
            <th class="py-2 px-4">Ganho Mensal</th>
            <th class="py-2 px-4">Status</th>
            <th class="py-2 px-4">Endereço</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border px-4 py-2 flex space-x-2">
              <button @click="openForm(user)" class="text-blue-500 hover:text-blue-700">
                <Icon icon="mdi:pencil" width="24" height="24" />
              </button>
              <button @click="deleteUser(user.id)" class="text-red-500 hover:text-red-700">
                <Icon icon="mdi:trash-can" width="24" height="24" />
              </button>
            </td>
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">{{ user.phone }}</td>
            <td class="border px-4 py-2">{{ user.cpfCnpj }}</td>
            <td class="border px-4 py-2">{{ user.monthlyIncome }}</td>
            <td class="border px-4 py-2">{{ user.status }}</td>
            <td class="border px-4 py-2">{{ user.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <UserForm v-if="showForm" :userToEdit="userToEdit" @close="closeForm" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import UserForm from './UserForm.vue';
import { Icon } from '@iconify/vue';

const userStore = useUserStore();
const users = userStore.users;
const showForm = ref(false);
const userToEdit = ref(null);

function openForm(user = null) {
  userToEdit.value = user;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  userToEdit.value = null;
}

function deleteUser(userId) {
  userStore.deleteUser(userId);
}
</script>
