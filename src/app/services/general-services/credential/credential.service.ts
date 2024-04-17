import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Credential } from '../../../models/Accounts-Models/credential';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../login-services/storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {


  constructor(private http: HttpClient, private storageservice: StorageService) { }
  getCredentials(): Observable<any> {
    const savedAccount = this.storageservice.getSavedAccount();
    var jwt = savedAccount?.jwt;
    if (!jwt) {
      throw new Error('JWT token is not defined.');
    }
    jwt = jwt.replace(/"/g, '');

    return this.http.get<any>(`${environment.baseURL}/accounts/all`, {
      headers: {
        Authorization: jwt
      }
    });
  }
  delete(id: number) {
    return this.http.delete<Credential[]>('http://localhost:/admin/accounts/delete/+id');
  }
  postCredential(credentialData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/post/account`,credentialData)
  }
}
