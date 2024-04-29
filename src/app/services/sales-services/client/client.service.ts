import { Injectable } from '@angular/core';
import { Client } from '../../../models/sales-models/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>('http://localhost:/usuario/' + id);
  }
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:/usuario/all');
  }
}
