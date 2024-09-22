<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-auto"
  >
    <div
      class="bg-white p-6 mt-4 rounded shadow-lg w-full max-w-lg relative max-h-full overflow-y-auto"
    >
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <Icon icon="mdi:close" width="24" height="24" />
      </button>
      <h2 class="text-xl font-bold mb-4">
        {{ isEditMode ? 'Editar Usuário' : 'Adicionar Usuário' }}
      </h2>
      <form @submit.prevent="saveUser">
        <div class="mb-4">
          <label class="block text-gray-700">Nome</label>
          <input
            v-model="user.name"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Digite o nome"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="w-full px-3 py-2 border rounded"
            placeholder="Ex: email@email.com"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Telefone</label>
          <input
            v-model="user.phone"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Ex: (11) 99999-9999"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">CPF/CNPJ</label>
          <input
            v-model="user.cpfCnpj"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Ex: 123.456.789-00"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Ganho Mensal</label>
          <input
            v-model="formattedMonthlyIncome"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Digite o ganho mensal"
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
            placeholder="Digite o endereço"
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
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center">
              <Icon icon="mdi:loading" class="animate-spin mr-2" width="24" height="24" />
              Salvando...
            </span>
            <span v-else>Salvar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from 'vue';
import { useUserStore, type User } from '@/stores/UserStore';
import { Icon } from '@iconify/vue'; // Importação do Icon

const props = defineProps({
  userToEdit: {
    type: Object,
    default: null,
  },
});

const userStore = useUserStore();
const isEditMode = ref(false);
const isLoading = ref(false); // Estado de carregamento
const user = ref<User>({
  id: 0,
  name: '',
  email: '',
  phone: '',
  cpfCnpj: '',
  monthlyIncome: 0,
  status: 'active',
  address: '',
});

const emit = defineEmits(['close']);

watch(
  () => props.userToEdit,
  (newUser) => {
    if (newUser) {
      user.value = { ...newUser } as User;
      isEditMode.value = true;
    } else {
      resetForm();
      isEditMode.value = false;
    }
  },
  { immediate: true },
);

const formattedMonthlyIncome = computed({
  get() {
    return user.value.monthlyIncome ? `R$ ${user.value.monthlyIncome}` : '';
  },
  set(value: string) {
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
    user.value.monthlyIncome = isNaN(numericValue) ? 0 : numericValue;
  },
});

async function saveUser() {
  isLoading.value = true; // Inicia o carregamento
  try {
    // Simula um tempo de espera fictício
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (isEditMode.value) {
      await userStore.updateUser(user.value);
    } else {
      await userStore.addUser(user.value);
    }
    emit('close');
  } finally {
    isLoading.value = false; // Finaliza o carregamento
  }
}

function resetForm() {
  user.value = {
    id: 0,
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
