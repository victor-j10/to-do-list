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
    //agrupamos el formulario y le damos las condiciones que queremos.
    this.form = this.fb.group({
      //requerido
      title: ['', Validators.required],
      //requerido y mínimo 10 carácteres
      description: ['', [Validators.required, Validators.minLength(10)]],
      //requerido
      status: ['Pendiente', Validators.required],
    });

    //se obtiene el id de la tarea, si la hay
    this.taskId = this.route.snapshot.paramMap.get('id');
    //si la hay, se cambia el estado de la variable
    this.isEdit = !!this.taskId;

    //si existe, se busca en el metodo de gettask por id, luego se guarda el valor en el formulario
    //para ser editado más adelante.
    if (this.isEdit) {
      this.taskService.getTask(this.taskId!).subscribe(task => {
        this.form.patchValue(task);
      });
    }
  }

  //botón para guardar y actualizar un registro.
  onSubmit(): void {
    //se revisa si el formulario es válido, en caso negativo se detiene la acción
    if (this.form.invalid) return;

    //se guardan los valores del formulario
    const task: Task = this.form.value;

    //se valida si es actualizar o guardar
    //si es actualizar, se envía la información del formulario junto con el id de la tarea
    //sino, solo se envía la tarea
    const request = this.isEdit
      ? this.taskService.updateTask({ ...task, id: this.taskId! })
      : this.taskService.createTask(task);

    //se susbscribe al requeste y al terminar navegamos de vuelta a tasks.
    request.subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
