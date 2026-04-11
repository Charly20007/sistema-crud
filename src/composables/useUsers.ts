import { ref } from "vue"
import { User, UserInput } from "../types/User"
import { getUsers } from "../services/api";

export const useUsers = () => {
    const users = ref<User[]>([]);
    const isLoading = ref<boolean>(false);

    const fetchUsers = async (): Promise<void> => {
        isLoading.value = true;
        try {
            const data = await getUsers();
            users.value = data;
        } catch (error) {
            console.error('Error al obtener los usuarios', error);
        } finally {
            isLoading.value = false;
        }
    };

    const addUser = (userData: UserInput) => {
        const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1
            : 1;
        users.value.push({ ...userData, id: newId });
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
        isLoading,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser
    };
}