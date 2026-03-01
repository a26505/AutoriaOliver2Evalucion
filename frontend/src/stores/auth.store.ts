import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await api.post('/auth/login', { email, password });
      this.user = res.data.user;
      this.token = res.data.token;
      if (this.token) {
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
});
