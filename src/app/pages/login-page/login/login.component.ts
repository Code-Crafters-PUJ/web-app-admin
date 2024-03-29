import { Component, inject } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { Credential } from '../../../models/credential';
import { StorageService } from '../../../services/storage.service';


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

  constructor(){
    this.authService = inject(AuthService)
    this.storageService = inject(StorageService)
  }

  onSubmit(){

    const email = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;


    if(!email.value || !password.value){
      alert('Por favor ingrese email y contraseña');
      return
    }

    let credential = { email: email.value, password: password.value } as Credential;

    this.authService.login(credential).subscribe({
      next: (response: any) => {

        this.storageService.saveAccount(response.account);

      },
      error: (error: any) => {
        alert('Usuario incorrecto');
      }
    });
    
  }
}
