import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../login-services/storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PqrService {

  constructor(private http: HttpClient, private storageservice: StorageService) { }
  getPQRS(): Observable<any> {
    const savedAccount = this.storageservice.getSavedAccount();
    var jwt = savedAccount?.jwt;
    if (!jwt) {
      throw new Error('JWT token is not defined.');
    }
    jwt = jwt.replace(/"/g, '');

    return this.http.get<any>(`${environment.baseURL}/pqrs/all`, {
      headers: {
        Authorization: jwt
      }
    });
  }
  getClient(id:number):Observable<any>{
    const savedAccount = this.storageservice.getSavedAccount();
    var jwt = savedAccount?.jwt;
    if (!jwt) {
      throw new Error('JWT token is not defined.');
    }
    jwt = jwt.replace(/"/g, '');
    return this.http.get<any>(`${environment.baseURL}/pqrs/clients/${id}`, {
      headers: {
        Authorization: jwt
      }
    });

  }
  getPQRSClient(id:number):Observable<any>{
    const savedAccount = this.storageservice.getSavedAccount();
    var jwt = savedAccount?.jwt;
    if (!jwt) {
      throw new Error('JWT token is not defined.');
    }
    jwt = jwt.replace(/"/g, '');
    return this.http.get<any>(`${environment.baseURL}/pqrs/${id}`, {
      headers: {
        Authorization: jwt
      }
    });

  }
}
