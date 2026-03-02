<template>
  <header class="p-6 bg-white shadow-sm flex justify-between items-center px-12">
    <div class="text-2xl font-bold text-indigo-600 italic">NEXUS</div>
    <div class="flex gap-4 items-center">
      <router-link to="/" class="hover:text-indigo-600 transition-colors">Inicio</router-link>
      <router-link to="/login">
        <Button label="Acceso Admin" icon="pi pi-user" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
</script>
