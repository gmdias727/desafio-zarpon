<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Lista de Usuários</h1>
    <button @click="openForm()" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
      Adicionar Usuário
    </button>
    <div class="mb-4">
      <input
        v-model="filters.name"
        type="text"
        placeholder="Filtrar por nome"
        class="border px-2 py-1 mr-2"
      />
      <input
        v-model="filters.email"
        type="text"
        placeholder="Filtrar por email"
        class="border px-2 py-1 mr-2"
      />
      <select v-model="filters.status" class="border px-2 py-1">
        <option value="">Todos</option>
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
      </select>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 cursor-pointer" @click="sortBy('id')">ID</th>
            <th class="py-2 px-4 cursor-pointer" @click="sortBy('name')">Nome</th>
            <th class="py-2 px-4 cursor-pointer" @click="sortBy('email')">Email</th>
            <th class="py-2 px-4 cursor-pointer" @click="sortBy('status')">Status</th>
            <th class="py-2 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredAndSortedUsers" :key="user.id">
            <td class="border px-4 py-2">{{ user.id }}</td>
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">{{ user.status }}</td>
            <td class="border px-4 py-2 flex space-x-2">
              <button @click="openForm(user)" class="text-blue-500 hover:text-blue-700">
                <Icon icon="mdi:pencil" width="24" height="24" />
              </button>
              <button @click="confirmDelete(user.id)" class="text-red-500 hover:text-red-700">
                <Icon icon="mdi:trash-can" width="24" height="24" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UserForm v-if="showForm" :userToEdit="userToEdit ?? undefined" @close="closeForm" />
    <ConfirmModal v-if="showConfirmModal" @confirm="deleteUser" @cancel="closeConfirmModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore, type User } from '@/stores/UserStore';
import { Icon } from '@iconify/vue';
import UserForm from '@/components/User/UserForm.vue';
import ConfirmModal from '@/components/Modal/ConfirmModal.vue';

const userStore = useUserStore();
const users = ref(userStore.users);
const showForm = ref(false);
const showConfirmModal = ref(false);
const userToEdit = ref<User | null>(null);
const userIdToDelete = ref<number | null>(null);
const filters = ref({ name: '', email: '', status: '' });
const sortKey = ref<string | null>(null);
const sortOrder = ref(1);

function openForm(user: User | null = null) {
  userToEdit.value = user;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  userToEdit.value = null;
}

function confirmDelete(userId: number) {
  userIdToDelete.value = userId;
  showConfirmModal.value = true;
}

function closeConfirmModal() {
  showConfirmModal.value = false;
  userIdToDelete.value = null;
}

async function deleteUser() {
  if (userIdToDelete.value !== null) {
    await userStore.deleteUser(userIdToDelete.value);
    users.value = userStore.users;
    closeConfirmModal();
  }
}

function sortBy(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
}

const filteredAndSortedUsers = computed(() => {
  let filteredUsers = users.value;

  if (filters.value.name) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(filters.value.name.toLowerCase()),
    );
  }

  if (filters.value.email) {
    filteredUsers = filteredUsers.filter((user) =>
      user.email.toLowerCase().includes(filters.value.email.toLowerCase()),
    );
  }

  if (filters.value.status) {
    filteredUsers = filteredUsers.filter((user) => user.status === filters.value.status);
  }

  if (sortKey.value) {
    filteredUsers = filteredUsers.slice().sort((a, b) => {
      const aValue = a[sortKey.value as keyof User];
      const bValue = b[sortKey.value as keyof User];
      if (aValue < bValue) return -sortOrder.value;
      if (aValue > bValue) return sortOrder.value;
      return 0;
    });
  }

  return filteredUsers;
});
</script>
