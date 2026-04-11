<script setup lang="ts">
import { ToastType } from '../../composables/useToasts';

defineProps<{
  message: string;
  type: ToastType;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const iconMap: Record<ToastType, string> = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
};

const colorMap: Record<ToastType, string> = {
  success: 'bg-emerald-50 text-emerald-800 border-emerald-100 shadow-emerald-100',
  error: 'bg-red-50 text-red-800 border-red-100 shadow-red-100',
  info: 'bg-blue-50 text-blue-800 border-blue-100 shadow-blue-100',
  warning: 'bg-amber-50 text-amber-800 border-amber-100 shadow-amber-100'
};

const iconColorMap: Record<ToastType, string> = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-amber-500'
};
</script>

<template>
  <div 
    class="flex items-center p-4 min-w-[300px] rounded-2xl border shadow-xl bg-white backdrop-blur-md animate-in slide-in-from-right duration-300"
    :class="colorMap[type]"
  >
    <div 
      class="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm mr-4"
      :class="iconColorMap[type]"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconMap[type]" />
      </svg>
    </div>
    <div class="grow font-medium text-sm">
      {{ message }}
    </div>
    <button 
      @click="emit('close')"
      class="ml-4 p-1 rounded-lg hover:bg-black/5 transition-colors text-current opacity-40 hover:opacity-100"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
</style>
