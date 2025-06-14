import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../core/task.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatIconModule,
  ],
})

export class TaskForm implements OnInit {
  form!: FormGroup;
  taskId: string | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['Pendiente', Validators.required],
    });

    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.taskId;

    if (this.isEdit) {
      this.taskService.getTask(this.taskId!).subscribe(task => {
        this.form.patchValue(task);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const task: Task = this.form.value;

    const request = this.isEdit
      ? this.taskService.updateTask({ ...task, id: this.taskId! })
      : this.taskService.createTask(task);

    request.subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
