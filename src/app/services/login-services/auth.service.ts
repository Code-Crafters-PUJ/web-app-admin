import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Credential } from '../../models/login-models/credential';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }


  async login(email: string, password: string) {
    var responseBody = await this.http.post(`${environment.baseURL}/user/login`, { email: email, password: password }, { withCredentials: true, responseType: "text" }).toPromise();
    return responseBody;


  }

  

}
