<script setup lang="ts">
import BaseButton from './BaseButton.vue';

defineProps<{
  isOpen: boolean;
  title: string;
  message: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="emit('cancel')"></div>
        
        <!-- Modal Content -->
        <Transition name="scale">
          <div v-if="isOpen" class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 p-8 border border-slate-100">
            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 class="text-xl font-bold text-slate-900 mb-2">{{ title }}</h3>
              <p class="text-slate-500 leading-relaxed mb-8">
                {{ message }}
              </p>
              
              <div class="flex gap-3 w-full">
                <BaseButton 
                  variant="ghost" 
                  class="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600"
                  @click="emit('cancel')"
                >
                  Cancelar
                </BaseButton>
                <BaseButton 
                  variant="danger" 
                  class="flex-1 py-3"
                  @click="emit('confirm')"
                >
                  Eliminar
                </BaseButton>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
