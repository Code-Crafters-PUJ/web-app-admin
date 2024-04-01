import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/login-services/auth.service';
import { Credential } from '../../../models/login-models/credential';
import { StorageService } from '../../../services/login-services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService: AuthService
  private storageService: StorageService

  constructor(private router: Router) {
    this.authService = inject(AuthService)
    this.storageService = inject(StorageService)
  }

  onSubmit() {

    const email = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let role: any;


    if (!email.value || !password.value) {
      alert('Por favor ingrese email y contraseña');
      return
    }
    if (email.value == "admin") {
      this.router.navigate(['/home/admin']);
    }
    else {
      this.router.navigate(['/home/sales']);
    }

    let credential = { email: email.value, password: password.value } as Credential;

    this.authService.login(credential).subscribe({

      next: (response: any) => {

        this.storageService.saveAccount(response.account);
        role = this.storageService.getSavedAccount()?.role;
      },
      error: (error: any) => {
        alert('Usuario incorrecto');
      }

    });
  }
}
