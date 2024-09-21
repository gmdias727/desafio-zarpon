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

export const useUserStore = defineStore('user', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
    nextId: JSON.parse(localStorage.getItem('nextId') || '1'),
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
