import { defineStore } from 'pinia';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  monthlyIncome: number;
  status: 'active' | 'inactive';
  address: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '123456789',
    cpfCnpj: '123.456.789-00',
    monthlyIncome: 3000,
    status: 'active',
    address: 'Rua A, 123, São Paulo, SP',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    phone: '987654321',
    cpfCnpj: '987.654.321-00',
    monthlyIncome: 4500,
    status: 'inactive',
    address: 'Rua B, 456, Rio de Janeiro, RJ',
  },
  {
    id: 3,
    name: 'Carlos Souza',
    email: 'carlos.souza@example.com',
    phone: '456123789',
    cpfCnpj: '456.123.789-00',
    monthlyIncome: 5000,
    status: 'active',
    address: 'Rua C, 789, Belo Horizonte, MG',
  },
  {
    id: 4,
    name: 'Ana Pereira',
    email: 'ana.pereira@example.com',
    phone: '321654987',
    cpfCnpj: '321.654.987-00',
    monthlyIncome: 3500,
    status: 'inactive',
    address: 'Rua D, 101, Curitiba, PR',
  },
  {
    id: 5,
    name: 'Pedro Lima',
    email: 'pedro.lima@example.com',
    phone: '789123456',
    cpfCnpj: '789.123.456-00',
    monthlyIncome: 4000,
    status: 'active',
    address: 'Rua E, 202, Porto Alegre, RS',
  },
];

export const useUserStore = defineStore('user', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || JSON.stringify(mockUsers)) as User[],
    nextId: JSON.parse(localStorage.getItem('nextId') || '6'),
  }),
  actions: {
    addUser(user: Omit<User, 'id'>) {
      this.users.push({ ...user, id: this.nextId++ });
      this.saveToLocalStorage();
    },
    updateUser(updatedUser: User) {
      const index = this.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
        this.saveToLocalStorage();
      }
    },
    deleteUser(userId: number) {
      this.users = this.users.filter((user) => user.id !== userId);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('nextId', JSON.stringify(this.nextId));
    },
  },
});
