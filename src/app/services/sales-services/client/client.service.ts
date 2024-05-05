import { Injectable } from '@angular/core';
import { Client } from '../../../models/sales-models/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Billing } from '../../../models/sales-models/billing';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  getClientById(id: number): Observable<{client:Client}> {
    return this.http.get<{client: Client}>(environment.baseURL + "/clients/" + id);
  }
  getClients(): Observable<{clients: Client[]}> {
    return this.http.get<{clients: Client[]}>(environment.baseURL + "/clients/all");
  }
  getStats(): Observable<any> {
    return this.http.get<any>(environment.baseURL + "/clients/sales/stats");
  }
  getSalesByClient(id: number): Observable<{sales: Billing[]}> {
    return this.http.get<{sales: Billing[]}>(environment.baseURL + "/clients/sales/" + id);
  }
}
