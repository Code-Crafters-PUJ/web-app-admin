import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Billing } from '../../../models/sales-models/billing';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../login-services/storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient, private storageservice: StorageService) { }
  getBillings(): Observable<any> {
    const savedAccount = this.storageservice.getSavedAccount();
    var jwt = savedAccount?.jwt;
    if (!jwt) {
      throw new Error('JWT token is not defined.');
    }
    jwt = jwt.replace(/"/g, '');

    return this.http.get<any>(`${environment.baseURL}/clients/sales/all`, {
      headers: {
        Authorization: jwt
      }
    });
  }
}
