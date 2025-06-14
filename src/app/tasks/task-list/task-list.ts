import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/task.service';
import { Task } from '../task.model';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatIcon,
    FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',

})
export class TaskListComponent implements OnInit {
  //se dejan creadas las variables a utilizar durante la ejecución de la app
  //acá se guardan todas las tareas
  tasks: Task[] = [];
  //acá se guardan las tareas que sean filtradas desde el select o el input
  filteredTasks: Task[] = [];
  //variable para obtener lo que escribe el usuario
  searchText: string = '';
  //variable para obtener lo que selecciona el usuario
  selectedStatus: string = 'Todos';

  //se inyectan los servicios y el router para ser usados
  constructor(private taskService: TaskService, private router: Router, private authU: AuthService) { }

  //se obtienen las tareas desde el servicio de la api y se aplica el filtro inicial.
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  //botón para navegar hasta la cración de tareas
  addTask() {
    this.router.navigate(['/create-tasks'])
  }

  //botón para navegar hasta la actualización de tareas
  editTask(task: Task) {
    this.router.navigate(['/create-tasks', task])
  }

  //botón para eliminar las tareas.
  //se llama al servicio, se pasa el id y luego filtro el nuevo array excluyendo la id eliminada
  deleteTask(id: any): void {
    const confirmDelete = confirm('¿Estás seguro de eliminar esta tarea?');
    if (!confirmDelete) return;

    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.applyFilters();
    });
  }

  //se realiza un filtro en las tareas para buscar por titulo o descripción.
  //también por el estado.
  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesText =
        task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'Todos' || task.status.toLowerCase() === this.selectedStatus.toLowerCase();

      return matchesText && matchesStatus;
    });
  }

  //se controla si el usuario ha estado escribiendo.
  onSearchChange(): void {
    this.applyFilters();
  }

  //se controla si el usuario ha seleccionado un estado
  onStatusChange(): void {
    this.applyFilters();
  }

  //botón para cerrar sesión.
  logout(): void {
    this.authU.logout();
  }

}
