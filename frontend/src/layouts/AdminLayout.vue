<template>
  <div class="admin-layout flex flex-col min-h-screen bg-gray-50">
    <AdminHeader />
    
    <main class="flex-grow p-8 max-w-7xl mx-auto w-full">
      <router-view />
    </main>

    <AdminFooter />
  </div>
</template>

<script setup lang="ts">
import AdminHeader from '../components/layout/AdminHeader.vue';
import AdminFooter from '../components/layout/AdminFooter.vue';
</script>
