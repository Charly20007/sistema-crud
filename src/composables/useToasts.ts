import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

const toasts = ref<Toast[]>([]);
let counter = 0;

export const useToasts = () => {
    const addToast = (message: string, type: ToastType = 'success', duration = 3000) => {
        const id = counter++;
        const toast: Toast = { id, message, type };
        toasts.value.push(toast);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id: number) => {
        const index = toasts.value.findIndex(t => t.id === id);
        if (index !== -1) {
            toasts.value.splice(index, 1);
        }
    };

    return {
        toasts,
        addToast,
        removeToast
    };
};
