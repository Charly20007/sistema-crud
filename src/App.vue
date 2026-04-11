<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUsers } from './composables/useUsers';
import UserTable from './components/UserTable.vue';
import UserModal from './components/UserModal.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseToast from './components/ui/BaseToast.vue';
import { useToasts } from './composables/useToasts';
import type { User, UserInput } from './types/User';

// 1. Extraemos la lógica del composable
const { users, isLoading, fetchUsers, addUser, updateUser, deleteUser } = useUsers();
const { toasts, addToast, removeToast } = useToasts();

// 2. Estado para controlar el Modal
const isModalOpen = ref(false);
const selectedUser = ref<User | null>(null);

// 3. Cargar usuarios al montar el componente
onMounted(() => {
  fetchUsers();
});

// 4. Funciones de orquestación (Flecha)
const openCreateModal = () => {
  selectedUser.value = null;
  isModalOpen.value = true;
};

const openEditModal = (user: User) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

const handleSaveUser = (userData: UserInput) => {
  if (selectedUser.value) {
    updateUser(selectedUser.value.id, userData);
    addToast('Usuario actualizado correctamente', 'success');
  } else {
    addUser(userData);
    addToast('Usuario creado correctamente', 'success');
  }
  isModalOpen.value = false;
};

const handleDeleteUser = (id: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    deleteUser(id);
    addToast('Usuario eliminado correctamente', 'success');
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans flex flex-col">
    <!-- Header / Navbar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-lg">U</div>
            <h1 class="text-xl font-bold tracking-tight text-slate-900">UserNexus</h1>
          </div>
          <div class="flex items-center gap-4">
            <BaseButton 
              variant="primary"
              size="md"
              @click="openCreateModal"
              class="hidden sm:flex"
            >
              <span class="mr-2">+</span> Nuevo Usuario
            </BaseButton>
            <button class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grow">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-1">Panel de Control</h2>
        <p class="text-slate-500">Gestiona los usuarios de tu organización de forma sencilla y eficiente.</p>
      </div>

      <!-- Stats Section -->
      <div class="mb-8">
        <div class="premium-card p-8 bg-linear-to-br from-white to-slate-50 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div class="flex items-center gap-5">
              <div class="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 ring-4 ring-indigo-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total de la Red</p>
                <div class="flex items-baseline gap-2">
                  <p class="text-4xl font-extrabold text-slate-900 tracking-tight">{{ users.length }}</p>
                  <p class="text-slate-500 font-medium">Usuarios registrados</p>
                </div>
              </div>
            </div>
            <div class="h-px md:h-12 md:w-px bg-slate-200"></div>
            <div class="grow max-w-md">
              <p class="text-sm text-slate-500 leading-relaxed mb-0">
                Visualización en tiempo real de tu base de datos centralizada. Gestiona permisos y perfiles desde un solo lugar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-if="isLoading" class="premium-card py-24 flex flex-col items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p class="text-slate-600 font-medium">Sincronizando con la red...</p>
      </div>

      <div v-else class="space-y-4">
        <div class="flex justify-between items-center sm:hidden mb-4 px-2">
           <BaseButton 
              variant="primary"
              size="md"
              @click="openCreateModal"
              class="w-full"
            >
              + Nuevo Usuario
            </BaseButton>
        </div>
        <UserTable 
          :users="users" 
          @edit="openEditModal" 
          @delete="handleDeleteUser" 
        />
        <div class="flex justify-end pr-2">
          <p class="text-sm text-slate-400 font-medium italic">
            Mostrando {{ users.length }} registros en total
          </p>
        </div>
      </div>

      <UserModal 
        :is-open="isModalOpen" 
        :user-to-edit="selectedUser"
        @close="isModalOpen = false"
        @save="handleSaveUser"
      />

      <!-- Toast Notifications -->
      <div class="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <TransitionGroup name="toast">
          <BaseToast 
            v-for="toast in toasts" 
            :key="toast.id"
            :message="toast.message"
            :type="toast.type"
            @close="removeToast(toast.id)"
          />
        </TransitionGroup>
      </div>
    </main>

    <footer class="py-8 bg-white border-t border-slate-200 mt-8">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-slate-400 text-sm">© 2024 UserNexus Dashboard. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
.toast-move {
  transition: transform 0.4s ease;
}
</style>