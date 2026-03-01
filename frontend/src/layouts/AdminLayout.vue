<template>
  <div class="admin-layout flex flex-col min-h-screen bg-gray-50">
    <Toast />
    <header class="p-4 bg-indigo-700 text-white flex justify-between items-center shadow-lg px-8">
      <div class="flex items-center gap-4">
        <div class="text-xl font-black tracking-tighter">NEXUS ADMIN</div>
        <nav class="ml-8 flex gap-6">
          <router-link 
            to="/admin/products" 
            class="opacity-70 hover:opacity-100 transition-opacity font-medium"
            active-class="opacity-100 border-b-2 border-white pb-1"
          >
            Productos
          </router-link>
          <router-link 
            to="/admin/categories" 
            class="opacity-70 hover:opacity-100 transition-opacity font-medium"
            active-class="opacity-100 border-b-2 border-white pb-1"
          >
            Categorías
          </router-link>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm opacity-80">{{ auth.user?.email }}</span>
        <Button 
          icon="pi pi-sign-out" 
          severity="secondary" 
          rounded 
          text 
          @click="logout" 
          v-tooltip="'Cerrar Sesión'"
        />
      </div>
    </header>
    
    <main class="flex-grow p-8 max-w-7xl mx-auto w-full">
      <router-view />
    </main>

    <footer class="p-6 bg-white border-t text-center text-sm text-gray-500">
      <div class="flex justify-center gap-4 mb-2">
        <span class="font-bold">Nexus v1.0</span>
        <span>•</span>
        <span>Portal de Administración</span>
      </div>
      &copy; 2026 Nexus Systems International
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>
