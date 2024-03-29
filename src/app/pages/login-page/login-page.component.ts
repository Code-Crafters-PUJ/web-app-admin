import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [LoginComponent]
})

export class LoginPageComponent {

}
