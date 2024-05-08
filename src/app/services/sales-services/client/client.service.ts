import { Injectable } from '@angular/core';
import { Client } from '../../../models/sales-models/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Billing } from '../../../models/sales-models/billing';
import { StorageService } from '../../login-services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getToken(): string {
    const savedAccount = this.storageService.getSavedAccount();
    var jwt = savedAccount?.jwt;
    if (!jwt) {
      throw new Error('JWT token is not defined.');
    }
    return jwt
  }

  getClientById(id: number): Observable<{ client: Client }> {
    return this.http.get<{ client: Client }>(environment.baseURL + "/clients/" + id, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }
  getClients(): Observable<{ clients: Client[] }> {
    return this.http.get<{ clients: Client[] }>(environment.baseURL + "/clients/all", {
      headers: {
        Authorization: this.getToken()
      }
    });
  }
  getStats(): Observable<any> {
    return this.http.get<any>(environment.baseURL + "/clients/sales/stats", {
      headers: {
        Authorization: this.getToken()
      }
    });
  }
  getSalesByClient(id: number): Observable<{ sales: Billing[] }> {
    return this.http.get<{ sales: Billing[] }>(environment.baseURL + "/clients/sales/" + id, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }

  sendEmail(clientId: number, subject: string, message: string): Observable<any> {
    return this.http.post<Observable<any>>(environment.baseURL + "/clients/billing/email",
      {
        clientId,
        subject,
        message
      },
      {
        headers: {
          Authorization: this.getToken()
        },
      });
  }
}
