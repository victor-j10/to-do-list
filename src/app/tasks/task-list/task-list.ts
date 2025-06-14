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
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchText: string = '';
  selectedStatus: string = 'Todos';

  constructor(private taskService: TaskService, private router: Router, private authU: AuthService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  addTask() {
    this.router.navigate(['/create-tasks'])
  }

  editTask(task: Task) {
    this.router.navigate(['/create-tasks', task])
  }

  deleteTask(id: any): void {
    const confirmDelete = confirm('¿Estás seguro de eliminar esta tarea?');
    if (!confirmDelete) return;

    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.applyFilters();
    });
  }


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

  onSearchChange(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  logout(): void {
    this.authU.logout();
  }

}
