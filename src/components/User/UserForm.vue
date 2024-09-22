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
      <form @submit.prevent="saveUser" @invalid.prevent>
        <div class="mb-4">
          <label class="block text-gray-700">Nome *</label>
          <input
            v-model="user.name"
            @blur="touched.name = true"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Digite o nome"
            required
          />
          <span v-if="touched.name && !user.name" class="text-red-500">Nome é obrigatório.</span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email *</label>
          <input
            v-model="user.email"
            @blur="touched.email = true"
            type="email"
            class="w-full px-3 py-2 border rounded"
            placeholder="Ex: email@email.com"
            required
          />
          <span v-if="touched.email && !user.email" class="text-red-500">Email é obrigatório.</span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Telefone *</label>
          <input
            v-model="user.phone"
            @blur="touched.phone = true"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Ex: (11) 99999-9999"
            required
          />
          <span v-if="touched.phone && !user.phone" class="text-red-500"
            >Telefone é obrigatório.</span
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">CPF/CNPJ *</label>
          <input
            v-model="user.cpfCnpj"
            @blur="touched.cpfCnpj = true"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Ex: 123.456.789-00"
            required
          />
          <span v-if="touched.cpfCnpj && !user.cpfCnpj" class="text-red-500"
            >CPF/CNPJ é obrigatório.</span
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Ganho Mensal *</label>
          <input
            v-model="formattedMonthlyIncome"
            @blur="touched.monthlyIncome = true"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Digite o ganho mensal"
            required
          />
          <span v-if="touched.monthlyIncome && !formattedMonthlyIncome" class="text-red-500"
            >Ganho Mensal é obrigatório.</span
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Status *</label>
          <select
            v-model="user.status"
            @blur="touched.status = true"
            class="w-full px-3 py-2 border rounded"
            required
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
          <span v-if="touched.status && !user.status" class="text-red-500"
            >Status é obrigatório.</span
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">CEP *</label>
          <input
            v-model="user.cep"
            @blur="fetchAddress"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Digite o CEP"
            required
          />
          <span v-if="touched.cep && !user.cep" class="text-red-500">CEP é obrigatório.</span>
          <span v-if="cepError" class="text-red-500">{{ cepError }}</span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Endereço *</label>
          <input
            v-model="user.address"
            @blur="touched.address = true"
            type="text"
            class="w-full px-3 py-2 border rounded"
            placeholder="Digite o endereço"
            required
          />
          <span v-if="touched.address && !user.address" class="text-red-500"
            >Endereço é obrigatório.</span
          >
        </div>
        <div v-if="successMessage" class="text-green-500 mb-4">{{ successMessage }}</div>
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
import { Icon } from '@iconify/vue';
import { toast } from 'vue3-toastify';
import axios from 'axios';

const props = defineProps({
  userToEdit: {
    type: Object,
    default: null,
  },
});

const userStore = useUserStore();
const isEditMode = ref(false);
const isLoading = ref(false);
const user = ref<User>({
  id: 0,
  name: '',
  email: '',
  phone: '',
  cpfCnpj: '',
  monthlyIncome: 0,
  status: 'active',
  address: '',
  cep: '',
});

const touched = ref({
  name: false,
  email: false,
  phone: false,
  cpfCnpj: false,
  monthlyIncome: false,
  status: false,
  address: false,
  cep: false,
});

const successMessage = ref('');
const cepError = ref('');

const emit = defineEmits(['close', 'success']);

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

async function fetchAddress() {
  if (!user.value.cep) return;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${user.value.cep}/json/`);
    if (response.data.erro) {
      cepError.value = 'CEP não encontrado.';
      user.value.address = '';
      return;
    }
    cepError.value = '';
    user.value.address = `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`;
  } catch (error) {
    cepError.value = 'Erro ao buscar o endereço.';
    user.value.address = '';
  }
}

async function saveUser() {
  if (
    !user.value.name ||
    !user.value.email ||
    !user.value.phone ||
    !user.value.cpfCnpj ||
    !formattedMonthlyIncome.value ||
    !user.value.status ||
    !user.value.address ||
    !user.value.cep ||
    cepError.value
  ) {
    toast('Por favor, preencha todos os campos obrigatórios corretamente.', { type: 'error' });
    return;
  }
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (isEditMode.value) {
      await userStore.updateUser(user.value);
    } else {
      await userStore.addUser(user.value);
      successMessage.value = 'Usuário criado com sucesso!';
      emit('success', 'Usuário criado com sucesso!');
    }
    emit('close');
  } finally {
    isLoading.value = false;
    toast('Usuário criado com sucesso!', {
      theme: 'auto',
      type: 'success',
      dangerouslyHTMLString: true,
    });
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
    cep: '',
  };
  cepError.value = '';
}
</script>
