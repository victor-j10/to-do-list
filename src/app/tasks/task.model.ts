//se crea la interfaz que guarda los datos que vienen desde la api

export interface Task {
    id?: string;
    title: string;
    description: string;
    status: 'Pendiente' | 'En Progreso' | 'Finalizada';
}