import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
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
  email = "";
  password = "";
  loginError = false;
  errorMessage = "";

  constructor(private http: HttpClient, private router: Router, private user: UsersService) { }


  onSubmit() {
    if (this.email === "" && this.password === "") {
      this.errorMessage = "Los campos no pueden estar vacíos";
      this.loginError = true;
    } else {
      this.user.getUserByEmail(this.email).subscribe({
        next: (data) => {
          const user = data?.email;
          const name = data?.name;
          if (user) {
            const pass = data?.password;
            if (pass === this.password) {
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
}

