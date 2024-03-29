import { Component, inject } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { Credential } from '../../../models/credential';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService: AuthService

  constructor(){
    this.authService = inject(AuthService)
  }

  onSubmit(){

    const email = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;


    if(!email.value || !password.value){
      alert('Por favor ingrese email y contraseña');
      return
    }

    let credential = { email: email.value, password: password.value } as Credential;

    this.authService.login(credential).subscribe(
      (response: any) => {
        console.log("Token de ingreso:", response.token);
        console.log("Cuenta de ingreso:", response.account);
      },
      (error: any) => {
        alert('Usuario incorrecto');
      }
    );
  }
}
