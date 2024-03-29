import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Credential } from '../models/credential';

const AUTH_URL = "http://.../user/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(credential: Credential): Observable<string> {
    return this.http.post<string>( AUTH_URL + "login" , credential, {withCredentials:true, });
  }

}
