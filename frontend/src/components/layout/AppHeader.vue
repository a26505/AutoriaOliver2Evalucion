<template>
  <header class="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md">
    <div class="container mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group">
        <span class="text-2xl font-black tracking-tighter text-gray-900">NEXUS</span>
      </router-link>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <template v-if="authStore.user">
          <div class="hidden sm:flex items-center gap-2 bg-gray-100/50 px-4 py-2 rounded-full border border-gray-200">
            <i class="pi pi-user text-gray-400"></i>
            <span class="text-xs font-bold text-gray-700">{{ authStore.user.email }}</span>
          </div>
          
          <router-link v-if="authStore.user.role === 'ADMIN'" to="/admin/products">
            <Button icon="pi pi-cog" rounded text severity="secondary" v-tooltip.bottom="'Administración'" />
          </router-link>
          
          <Button icon="pi pi-sign-out" rounded text severity="danger" @click="handleLogout" v-tooltip.bottom="'Cerrar sesión'" />
        </template>

        <template v-else>
          <router-link to="/login">
            <Button label="Acceso" icon="pi pi-user" rounded outlined size="small" />
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useAuthStore } from '../../stores/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>
