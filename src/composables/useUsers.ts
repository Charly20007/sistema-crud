import { ref, computed, watch } from "vue"
import { User, UserInput } from "../types/User"
import { getUsers } from "../services/api";

const users = ref<User[]>([]);
const searchQuery = ref('');
const STORAGE_KEY = 'sistema_crud_users';

watch(users, (newUsers) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsers));
}, { deep: true });

export const useUsers = () => {
    const isLoading = ref<boolean>(false);

    const filteredUsers = computed(() => {
        const query = searchQuery.value.toLowerCase().trim();
        if (!query) return users.value;

        return users.value.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    });

    const fetchUsers = async (): Promise<void> => {
        // Intentar cargar de localStorage primero
        const localData = localStorage.getItem(STORAGE_KEY);
        if (localData) {
            users.value = JSON.parse(localData);
            return;
        }

        isLoading.value = true;
        try {
            const data = await getUsers();
            users.value = data.sort((a, b) => b.id - a.id);
        } catch (error) {
            console.error('Error al obtener los usuarios', error);
        } finally {
            isLoading.value = false;
        }
    };

    const addUser = (userData: UserInput) => {
        const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1
            : 1;
        users.value.unshift({ ...userData, id: newId });
    };

    const updateUser = (id: number, userData: UserInput) => {
        const index = users.value.findIndex(u => u.id === id);
        if (index !== -1) {
            users.value[index] = { ...userData, id };
        }
    }

    const deleteUser = (id: number): void => {
        users.value = users.value.filter(u => u.id !== id);
    };

    return {
        users,
        filteredUsers,
        searchQuery,
        isLoading,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser
    };
}