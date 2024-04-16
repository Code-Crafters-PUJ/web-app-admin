import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Billing } from '../../../models/sales-models/billing';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }
  getBillings(): Observable<Billing[]> {
    return this.http.get<Billing[]>('http://localhost:/Subscription/all');
  }
}
