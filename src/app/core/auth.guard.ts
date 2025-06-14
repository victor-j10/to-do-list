import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    //método para válidar si el usuario está logueado. en caso verdadero lo mantiene en la vista
    //en caso falso lo devuelve al login.
    if (auth.isLoggedIn()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};
