<template>
  <div class="public-layout flex flex-col min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="flex-grow">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue';
import AppFooter from '../components/layout/AppFooter.vue';
</script>
