import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../../../models/sales-models/subscription';
import { Generation } from '../generation'

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { }
  getSubscriptions(): Observable<Subscription[]> {
    //return this.http.get<Client[]>('http://localhost:/Subscription/all');
    return new Observable<Subscription[]>(observer => {
      const subscriptions: Subscription[] = [Generation.subscription1, Generation.subscription2, Generation.subscription3, Generation.subscription4, Generation.subscription5, Generation.subscription6, Generation.subscription7, Generation.subscription8, Generation.subscription9, Generation.subscription10, Generation.subscription11, Generation.subscription12, Generation.subscription13, Generation.subscription14, Generation.subscription15, Generation.subscription16, Generation.subscription17, Generation.subscription18];
      observer.next(subscriptions);
      observer.complete();
    });
  }
}
