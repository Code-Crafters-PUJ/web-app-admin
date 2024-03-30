import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Credential } from '../models/credential';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  public login(credential: Credential): Observable<string> {

    var responseBody =  this.http.post(`${environment.baseURL}/user/login`, { credential: credential }, { withCredentials: true, });
    
    var respons = responseBody as Observable<string>;
    return respons
  }

}
