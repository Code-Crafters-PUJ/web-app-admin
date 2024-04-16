import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from '../../../models/Accounts-Models/credential';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(private http: HttpClient) { }
  getCredentials(): Observable<Credential[]> {
    return this.http.get<Credential[]>('http://localhost:/admin/accounts/all');

  }
  delete(id:number)
  {
    return this.http.delete<Credential[]>('http://localhost:/admin/accounts/delete/+id');
  }
}
