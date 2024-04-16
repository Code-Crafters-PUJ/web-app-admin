import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Generation } from '../generator';
import { Operation } from '../../../models/Users-models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor() { }
  getOperations(): Observable<Operation[]> {
    //return this.http.get<Operation[]>('http://localhost:/admin/Operation/all');
    return new Observable<Operation[]>(observer => {
      const Operations: Operation[] = [Generation.operation1,Generation.operation2]
      observer.next(Operations);
      observer.complete();
    });
  }
}
