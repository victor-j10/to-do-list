//se crea la interfaz que guarda los datos que vienen desde la api

export interface User {
    id: number | string;
    email: string;
    password: string;
    name: string;
}