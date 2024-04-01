import { Injectable } from '@angular/core';
import { Client } from '../../../models/sales-models/client';
import { Generation } from '../generation'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }
  getClient(id: number): Observable<Client> {
    // return this.http.get<Client>('http://localhost:/usuario/' + id);
    return new Observable<Client>(observer => {
      //simulation using generator
      const clients: Client[] = [Generation.client1, Generation.client2, Generation.client3]
      const client: Client = clients[id - 1];
      observer.next(client);
      observer.complete();
    });
  }
  getClients(): Observable<Client[]> {
    // return this.http.get<Client>('http://localhost:/usuario/all');
    return new Observable<Client[]>(observer => {
      //simulation using generator
      const clients: Client[] = [Generation.client1, Generation.client2, Generation.client3]
      observer.next(clients);
      observer.complete();
    });
  }
}
