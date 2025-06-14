export interface Task {
    id?: string;
    title: string;
    description: string;
    status: 'Pendiente' | 'En Progreso' | 'Finalizada';
}