import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../../models/general-models/account';
import { Generation } from '../generator'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }
  getAccounts(): Observable<Account[]> {
    //return this.http.get<Client[]>('http://localhost:/usuario/all');
    return new Observable<Account[]>(observer => {
      const subscriptions: Account[] = [Generation.account1,
      Generation.account2,
      Generation.account3,
      Generation.account4,
      Generation.account5,
      Generation.account6,
      Generation.account7,
      Generation.account8,
      Generation.account9,
      Generation.account10,
      Generation.account11,
      Generation.account12,
      Generation.account13,
      Generation.account14,
      Generation.account15]
      observer.next(subscriptions);
      observer.complete();
    });
  }
}
