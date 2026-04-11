export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export type UserInput = Omit<User, 'id'>;

export interface ExternalUser extends User {
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    website: string;
}