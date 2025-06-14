import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) { }

  //método para cerrar sesión
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  //método para válidar si un usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  ////método para obtener la info del usuario logueado
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
