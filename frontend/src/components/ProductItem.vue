<template>
  <div class="product-item p-4 border rounded shadow-sm bg-white hover:shadow-md transition">
    <div class="font-bold text-lg">{{ product.name }}</div>
    <div class="text-sm text-gray-500">{{ product.category?.name }}</div>
    <div class="flex justify-between mt-4 items-center">
      <span class="text-primary font-bold">${{ product.price }}</span>
      <span class="text-xs px-2 py-1 bg-gray-100 rounded">Stock: {{ product.stock }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  product: any
}>();
</script>
