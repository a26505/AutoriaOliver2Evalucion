<template>
  <header class="p-6 bg-white shadow-sm flex justify-between items-center px-12">
    <div class="text-2xl font-bold text-blue-600 tracking-wider uppercase">NEXUS</div>
    <div class="flex gap-4 items-center">
      <router-link to="/" class="hover:text-blue-600 transition-colors font-medium text-gray-700">Inicio</router-link>
      
      <template v-if="authStore.user">
        <span class="text-gray-600 mx-2">Hola, <span class="font-bold border-b-2 border-blue-500">{{ authStore.user.email }}</span></span>
        
        <router-link v-if="authStore.user.role === 'ADMIN'" to="/admin/products">
          <Button label="Panel Admin" icon="pi pi-cog" severity="info" text />
        </router-link>
        
        <Button label="Cerrar sesión" icon="pi pi-sign-out" severity="danger" text @click="handleLogout" />
      </template>

      <template v-else>
        <router-link to="/login">
          <Button label="Iniciar Sesión" icon="pi pi-user" />
        </router-link>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useAuthStore } from '../../../stores/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>
