<script setup lang="ts">
import { watch, computed } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import type { User, UserInput } from '../types/User';
import BaseButton from './ui/BaseButton.vue';

const props = defineProps<{
  isOpen: boolean;
  userToEdit: User | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', user: UserInput): void;
}>();

const schema = toTypedSchema(
  zod.object({
    name: zod.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(50, 'El nombre es demasiado largo'),
    username: zod.string().min(3, 'El usuario debe tener al menos 3 caracteres').regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos'),
    email: zod.string().min(1, 'El correo es obligatorio').email('Formato de correo inválido'),
    phone: zod.string().min(5, 'El teléfono debe tener al menos 5 dígitos').regex(/^[+0-9\s-]+$/, 'Formato de teléfono inválido'),
  })
);

const { handleSubmit, errors, defineField, resetForm, setValues } = useForm<UserInput>({
  validationSchema: schema,
  initialValues: {
    name: '',
    username: '',
    email: '',
    phone: ''
  }
});

const [name, nameProps] = defineField('name');
const [username, usernameProps] = defineField('username');
const [email, emailProps] = defineField('email');
const [phone, phoneProps] = defineField('phone');

const modalTitle = computed(() => props.userToEdit ? 'Editar Usuario' : 'Nuevo Usuario');

watch(() => props.userToEdit, (newUser) => {
  if (newUser) {
    setValues({
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone
    });
  } else {
    resetForm();
  }
}, { immediate: true });

const onSubmit = handleSubmit((values) => {
  emit('save', { ...values });
  handleClose();
});

const handleClose = (): void => {
  resetForm();
  emit('close');
};
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <Transition name="scale">
        <div v-if="isOpen" class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
          <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 class="text-xl font-bold text-slate-800 tracking-tight">{{ modalTitle }}</h3>
            <button @click="handleClose" class="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="onSubmit" class="p-8 space-y-5">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nombre Completo</label>
              <input 
                v-model="name" 
                v-bind="nameProps"
                type="text" 
                placeholder="Ej. Juan Pérez"
                class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all border p-3 text-slate-900 placeholder-slate-400 outline-none"
                :class="{'border-red-400 ring-4 ring-red-500/10': errors.name}"
              />
              <p v-if="errors.name" class="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nombre de Usuario</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">@</span>
                <input 
                  v-model="username" 
                  v-bind="usernameProps"
                  type="text" 
                  placeholder="usuario123"
                  class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all border p-3 pl-8 text-slate-900 placeholder-slate-400 outline-none"
                  :class="{'border-red-400 ring-4 ring-red-500/10': errors.username}"
                />
              </div>
              <p v-if="errors.username" class="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ errors.username }}
              </p>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Correo Electrónico</label>
              <input 
                v-model="email" 
                v-bind="emailProps"
                type="text" 
                placeholder="juan@ejemplo.com"
                class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all border p-3 text-slate-900 placeholder-slate-400 outline-none"
                :class="{'border-red-400 ring-4 ring-red-500/10': errors.email}"
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Teléfono</label>
              <input 
                v-model="phone" 
                v-bind="phoneProps"
                type="text" 
                placeholder="+54 9 11 1234 5678"
                class="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all border p-3 text-slate-900 placeholder-slate-400 outline-none"
                :class="{'border-red-400 ring-4 ring-red-500/10': errors.phone}"
              />
              <p v-if="errors.phone" class="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ errors.phone }}
              </p>
            </div>

            <div class="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-slate-50">
              <BaseButton 
                variant="ghost"
                class="sm:flex-1 text-slate-500"
                @click="handleClose"
              >
                Cancelar
              </BaseButton>
              <BaseButton 
                type="submit"
                variant="primary"
                class="sm:flex-1"
              >
                {{ props.userToEdit ? 'Actualizar Datos' : 'Crear Usuario' }}
              </BaseButton>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-enter-from, .scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>