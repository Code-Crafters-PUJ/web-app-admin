import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/login-services/auth.service';
import { StorageService } from '../../../services/login-services/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) {

  }
  
  visible:boolean = true;
  changetype:boolean =true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
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
          var role = JSON.parse(value).role;
          // Autenticación exitosa
          this.handleSuccessfulAuthentication(role);

        } else {
          // Autenticación fallida
          this.handleFailedAuthentication();
        }
      });
    }
  }
  private handleSuccessfulAuthentication(role:string) {
    Swal.fire({
      title: 'Bienvenido',
      text: "Autenticación exitosa",
      icon: 'success',
      confirmButtonText: 'OK'
    });
    if (role === "ADMIN") {
      this.router.navigate(['/home/admin']);

    } else{
      this.router.navigate(['/home/sales']);
    }
  }
  private handleFailedAuthentication() {
    Swal.fire({
      title: 'Uppss algo pasó',
      text: "La contraseña o el usuario son incorrectos",
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    window.location.reload();


  }
}

