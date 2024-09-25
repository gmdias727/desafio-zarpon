<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-3xl font-extrabold text-center text-blue-700 mb-4">Lista de Usuários</h1>
      <ProfileTab />
    </div>

    <button
      @click="openForm()"
      class="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-95 mb-4 flex items-center"
    >
      <Icon icon="mdi:plus" width="24" height="24" class="mr-2" />
      Adicionar
    </button>
    <div class="mb-4">
        <div class="flex space-x-2 mb-4">
      <input
            v-model="filters.query"
        type="text"
            placeholder="Buscar por nome, email, telefone, etc..."
            class="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <table class="min-w-full bg-white" v-if="filteredAndSortedUsers.length">
        <thead>
          <tr>
            <th
              class="py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              @click="sortBy('id')"
            >
              ID
              <Icon
                v-if="sortKey === 'id'"
                :icon="sortOrder === 1 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                width="16"
                height="16"
              />
            </th>
            <th
              class="py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              @click="sortBy('name')"
            >
              Nome
              <Icon
                v-if="sortKey === 'name'"
                :icon="sortOrder === 1 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                width="16"
                height="16"
              />
            </th>
            <th
              class="py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              @click="sortBy('email')"
            >
              Email
              <Icon
                v-if="sortKey === 'email'"
                :icon="sortOrder === 1 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                width="16"
                height="16"
              />
            </th>
            <th
              class="py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              @click="sortBy('phone')"
            >
              Telefone
              <Icon
                v-if="sortKey === 'phone'"
                :icon="sortOrder === 1 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                width="16"
                height="16"
              />
            </th>
            <th
              class="py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              @click="sortBy('cpfCnpj')"
            >
              CPF/CNPJ
              <Icon
                v-if="sortKey === 'cpfCnpj'"
                :icon="sortOrder === 1 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                width="16"
                height="16"
              />
            </th>
            <th
              class="py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              @click="sortBy('monthlyIncome')"
            >
              Ganho Mensal (R$)
              <Icon
                v-if="sortKey === 'monthlyIncome'"
                :icon="sortOrder === 1 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                width="16"
                height="16"
              />
            </th>
            <th
              class="py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              @click="sortBy('status')"
            >
              Status
              <Icon
                v-if="sortKey === 'status'"
                :icon="sortOrder === 1 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                width="16"
                height="16"
              />
            </th>
            <th
              class="py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              @click="sortBy('address')"
            >
              Endereço
              <Icon
                v-if="sortKey === 'address'"
                :icon="sortOrder === 1 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                width="16"
                height="16"
              />
            </th>
            <th class="py-2 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredAndSortedUsers" :key="user.id">
            <td class="border px-4 py-2">{{ user.id }}</td>
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">{{ formatPhone(user.phone) }}</td>
            <td class="border px-4 py-2">{{ user.cpfCnpj }}</td>
            <td class="border px-4 py-2">{{ user.monthlyIncome }}</td>
            <td class="border px-4 py-2">
              <Icon
                :icon="user.status === 'active' ? 'mdi:check-circle' : 'mdi:close-circle'"
                :class="user.status === 'active' ? 'text-green-500' : 'text-red-500'"
                width="24"
                height="24"
              />
            </td>
            <td class="border px-4 py-2">{{ user.address }}</td>
            <td class="border px-4 py-2 text-center flex justify-center items-center space-x-2">
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
      <p
        v-else
        class="text-center text-red-500 mt-4 text-xl font-bold flex items-center justify-center"
      >
        <Icon icon="mdi:alert-circle" width="24" height="24" class="mr-2" />
        Nenhum usuário encontrado.
      </p>
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
import { toast } from 'vue3-toastify';
import ProfileTab from '@/components/User/ProfileTab.vue';
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
    toast('Usuário deletado com sucesso!', { type: 'success' });
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

  if (filters.value.query) {
    const query = filters.value.query.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.cpfCnpj.toLowerCase().includes(query) ||
        user.address.toLowerCase().includes(query),
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

function formatPhone(phone: string): string {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
</script>
