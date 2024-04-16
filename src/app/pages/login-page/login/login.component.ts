import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/login-services/auth.service';
import { Credential } from '../../../models/login-models/credential';
import { StorageService } from '../../../services/login-services/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) {

  }

  signInUser(email: string, password: string) {
    if (email === "" || password === "") {
      Swal.fire({
        title: 'Uppss algo pasó',
        text: "Por favor, llene todos los campos",
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
    else {
      this.authService.login(email, password).then((value) => {
        if (value) {
          var jwt = JSON.parse(value).jwt;
          if (jwt === "No Credentials matches the given query." || jwt === "ups! credenciales incorrectas") {
            this.handleFailedAuthentication();
          } else {
            var role = JSON.parse(value).role;
            // Autenticación exitosa
            this.handleSuccessfulAuthentication(role);
          }
        } else {
          // Autenticación fallida
          this.handleFailedAuthentication();
        }
      });
    }
  }
  private handleSuccessfulAuthentication(role: string) {
    Swal.fire({
      title: 'Bienvenido',
      text: "Autenticación exitosa",
      icon: 'success',
      confirmButtonText: 'OK'
    });
    if (role === "ADMIN") {
      this.router.navigate(['/home/admin']);

    } else {
      this.router.navigate(['/home/sales']);
    }
  }
  private handleFailedAuthentication() {
    Swal.fire({
      title: 'Uppss algo pasó',
      text: "La contraseña o el usuario son incorrectos",
      icon: 'warning',
      confirmButtonText: 'OK'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
}

