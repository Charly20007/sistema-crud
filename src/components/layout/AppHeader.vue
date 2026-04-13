<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';

defineEmits<{
  (e: 'add-user'): void;
}>();
</script>

<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-lg">U</div>
          <h1 class="text-xl font-bold tracking-tight text-slate-900">Sistema CRUD</h1>
        </div>
        <div class="flex items-center gap-4">
          <BaseButton 
            variant="primary"
            size="md"
            @click="$emit('add-user')"
            class="hidden sm:flex"
          >
            <span class="mr-2">+</span> Nuevo Usuario
          </BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>
