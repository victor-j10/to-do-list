import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //se obtiene la api
  private apiUrl = 'https://684c2a50ed2578be881dec31.mockapi.io/tasks';

  constructor(private http: HttpClient) { }

  //método para obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  //método para obtener una tarea por id
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  //método para crear una tarea
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  //método para actualizar una tarea
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  //método para eliminar una tarea
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}