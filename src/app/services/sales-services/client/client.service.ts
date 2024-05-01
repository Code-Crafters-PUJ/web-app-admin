import { Injectable } from '@angular/core';
import { Client } from '../../../models/sales-models/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>('http://localhost:/usuario/' + id);
  }
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(environment.baseURL + "/clients/all");
  }
  getStats(): Observable<any> {
    return this.http.get<any>(environment.baseURL + "/clients/sales/stats");
  }
  getSalesByClient(id: string): Observable<any> {
    return this.http.get<any>(environment.baseURL + "/clients/" + id);
  }
}
