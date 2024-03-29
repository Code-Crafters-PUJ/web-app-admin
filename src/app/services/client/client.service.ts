//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';
import {Generation} from '../generation'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }
  getClientes(): Observable<Client[]> {
    //return this.http.get<Client[]>('http://localhost:/usuario/all');
    return new Observable<Client[]>(observer => {
      const clients: Client[] = [Generation.client1, Generation.client2, Generation.client3];
      observer.next(clients);
      observer.complete();
    });
  }

}
