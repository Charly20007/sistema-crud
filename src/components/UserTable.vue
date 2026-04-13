<script setup lang="ts">
import type { User } from '../types/User';
import BaseButton from './ui/BaseButton.vue';

const props = defineProps<{
    users: User[];
}>();

const emit = defineEmits<{
    (e: 'edit', user: User): void;
    (e: 'delete', id: number): void;
}>();

const handleEdit = (user: User): void => {
  emit('edit', user);
};

const handleDelete = (id: number): void => {
  emit('delete', id);
};
</script>

<template>
  <div>
    <div class="premium-card hidden sm:block">
      <table class="w-full text-sm text-left text-slate-600">
        <thead class="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Nombre</th>
            <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Usuario</th>
            <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Email</th>
            <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Teléfono</th>
            <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr 
            v-for="user in users" 
            :key="user.id" 
            class="group bg-white hover:bg-slate-50/80 transition-all duration-300"
          >
            <td class="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-8 w-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 font-bold text-xs uppercase">
                  {{ user.name.charAt(0) }}
                </div>
                {{ user.name }}
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">@{{ user.username }}</span>
            </td>
            <td class="px-6 py-4 text-slate-500">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 text-slate-500">
              {{ user.phone }}
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center gap-1 opacity-10 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <BaseButton 
                  variant="ghost"
                  size="sm"
                  class="text-indigo-600 hover:bg-indigo-50"
                  @click="handleEdit(user)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </BaseButton>
                <BaseButton 
                  variant="ghost"
                  size="sm"
                  class="text-red-500 hover:bg-red-50"
                  @click="handleDelete(user.id)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </BaseButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="sm:hidden grid grid-cols-1 gap-4">
      <div 
        v-for="user in users" 
        :key="'card-' + user.id"
        class="premium-card p-5 space-y-4"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-100">
              {{ user.name.charAt(0) }}
            </div>
            <div>
              <h4 class="font-bold text-slate-800 tracking-tight">{{ user.name }}</h4>
              <p class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">@{{ user.username }}</p>
            </div>
          </div>
          <div class="flex gap-1">
            <BaseButton 
              variant="ghost"
              size="sm"
              class="text-indigo-600 bg-slate-50 p-2 h-9 w-9 flex items-center justify-center"
              @click="handleEdit(user)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </BaseButton>
            <BaseButton 
              variant="ghost"
              size="sm"
              class="text-red-500 bg-slate-50 p-2 h-9 w-9 flex items-center justify-center"
              @click="handleDelete(user.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </BaseButton>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50 mt-2">
          <div>
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
            <p class="text-xs text-slate-600 truncate">{{ user.email }}</p>
          </div>
          <div>
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Teléfono</p>
            <p class="text-xs text-slate-600 truncate">{{ user.phone }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="users.length === 0" class="premium-card py-16 text-center text-slate-400">
      <div class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <p class="font-medium text-slate-900">No hay usuarios disponibles</p>
        <p class="text-xs mt-1">Comienza agregando uno nuevo al sistema.</p>
      </div>
    </div>
  </div>
</template>