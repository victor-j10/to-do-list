import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsersService } from '../../core/users.service';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  //se crean las variables a usar en la ejecución
  //variable para guardar el email digitado por el usuario
  email = "";
  //variable para guardar la contraseña ingresada por el usuario
  password = "";
  //variable para controlar el estado de los errores
  loginError = false;
  //variable para mostrar el error
  errorMessage = "";

  constructor(private router: Router, private user: UsersService) { }


  onSubmit() {
    // Validar si alguno de los campos está vacío
    if (!this.email || !this.password) {
      this.errorMessage = "Los campos no pueden estar vacíos";
      this.loginError = true;
      return;
    }

    //se busca al usuario por email y nos subscribimos para realizar los siguiente
    this.user.getUserByEmail(this.email).subscribe({
      next: (data) => {
        //guardamos el email
        const user = data?.email;
        const name = data?.name;
        if (user) {
          //si obtiene un valor, guardamos la contraseña
          const pass = data?.password;
          //si las contraseñas son iguales
          if (pass === this.password) {
            //guardamos en el localstorage la info del usuario
            localStorage.setItem('user', JSON.stringify({ user, name }));
            alert("Bienvenido");
            this.router.navigate(["/tasks"]);
            this.errorMessage = "";
            this.loginError = false;
          } else {
            this.errorMessage = 'Contraseña incorrecta'
            this.loginError = true;
          }

        } else {
          this.errorMessage = 'Este correo no está registrado'
          this.loginError = true;
        }
      },
      error: () => {
        this.errorMessage = 'Error al conectar con el servidor';
        this.loginError = true;
      }
    });


  }
}

