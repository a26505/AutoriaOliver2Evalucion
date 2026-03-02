<template>
  <header class="p-4 bg-indigo-700 text-white flex flex-col shadow-lg px-8">
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center gap-4">
        <div class="text-xl font-black tracking-tighter">NEXUS ADMIN</div>
        <nav class="ml-8 flex gap-6">
          <router-link 
            to="/admin/products" 
            class="opacity-70 hover:opacity-100 transition-opacity font-medium flex items-center gap-2"
            active-class="opacity-100 font-bold"
          >
            <i class="pi pi-box"></i> Productos
          </router-link>
          <router-link 
            to="/admin/categories" 
            class="opacity-70 hover:opacity-100 transition-opacity font-medium flex items-center gap-2"
            active-class="opacity-100 font-bold"
          >
            <i class="pi pi-tags"></i> Categorías
          </router-link>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex flex-col items-end mr-2">
          <span class="text-xs opacity-70">Administrador</span>
          <span class="text-sm font-bold">{{ auth.user?.email }}</span>
        </div>
        <Button 
          icon="pi pi-sign-out" 
          severity="secondary" 
          rounded 
          text 
          @click="logout" 
        />
      </div>
    </div>
    <div class="text-xs opacity-60 flex items-center gap-2 border-t border-indigo-600 pt-2">
      <i class="pi pi-home text-[10px]"></i>
      <span>Admin</span>
      <span>/</span>
      <span class="font-bold text-white uppercase tracking-widest">{{ currentSection }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth.store';
import { useRouter, useRoute } from 'vue-router';
import Button from 'primevue/button';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const currentSection = computed(() => {
  const path = route.path;
  if (path.includes('products')) return 'Productos';
  if (path.includes('categories')) return 'Categorías';
  return 'Dashboard';
});

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>
