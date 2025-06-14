import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const LoginGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    //método para válidar si un usuario no está logueado. en caso verdadero lo mantiene en el login
    //en caso falso lo deja en la vista principal de tareas.
    if (!auth.isLoggedIn()) {
        return true;
    } else {
        router.navigate(['/tasks']);
        return false;
    }
};
