import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Generation } from '../generator';
import { Rol } from '../../../models/general-models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor() { }
  getRoles(): Observable<Rol[]> {
    //return this.http.get<Rol[]>('http://localhost:/admin/Rol/all');
    return new Observable<Rol[]>(observer => {
      const Rols: Rol[] = [Generation.rol1,Generation.rol2,Generation.rol3]
      observer.next(Rols);
      observer.complete();
    });
  }
}
