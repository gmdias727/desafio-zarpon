<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
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
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <h2 class="text-xl font-bold mb-4">
        {{ isEditMode ? 'Editar Usuário' : 'Adicionar Usuário' }}
      </h2>
      <form @submit.prevent="saveUser">
        <div class="mb-4">
          <label class="block text-gray-700">Nome</label>
          <input v-model="user.name" type="text" class="w-full px-3 py-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Telefone</label>
          <input
            v-model="user.phone"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">CPF/CNPJ</label>
          <input
            v-model="user.cpfCnpj"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Ganho Mensal</label>
          <input
            v-model="user.monthlyIncome"
            type="number"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Status</label>
          <select v-model="user.status" class="w-full px-3 py-2 border rounded" required>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Endereço</label>
          <input
            v-model="user.address"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import { useUserStore } from '@/stores/UserStore';

const props = defineProps({
  userToEdit: {
    type: Object,
    default: null,
  },
});

const userStore = useUserStore();
const isEditMode = ref(false);
const user = ref({
  id: null,
  name: '',
  email: '',
  phone: '',
  cpfCnpj: '',
  monthlyIncome: 0,
  status: 'active',
  address: '',
});

watch(
  () => props.userToEdit,
  (newUser) => {
    if (newUser) {
      user.value = { ...newUser };
      isEditMode.value = true;
    } else {
      resetForm();
      isEditMode.value = false;
    }
  },
  { immediate: true },
);

function saveUser() {
  if (isEditMode.value) {
    userStore.updateUser(user.value);
  } else {
    userStore.addUser(user.value);
  }
  $emit('close');
}

function resetForm() {
  user.value = {
    id: null,
    name: '',
    email: '',
    phone: '',
    cpfCnpj: '',
    monthlyIncome: 0,
    status: 'active',
    address: '',
  };
}
</script>
