import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list';
import { TaskForm } from './tasks/task-form/task-form';
import { Login } from './pages/login/login';
import { AuthGuard } from './core/auth.guard';
import { LoginGuard } from './core/login.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'login', component: Login, canActivate: [LoginGuard] },
    { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: 'create-tasks', component: TaskForm, canActivate: [AuthGuard] }
];
