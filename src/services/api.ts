import type { ExternalUser, User } from "../types/User";

export const getUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Error al obtener los usuarios');
    const data: ExternalUser[] = await response.json();

    return data.map((user: ExternalUser): User => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone
    }));
}