import { Injectable } from '@angular/core';
import { Modul } from '../../../models/Users-models/Module';
import { Observable } from 'rxjs';
import { Generation } from '../generator';

@Injectable({
  providedIn: 'root'
})
export class ModulsService {

  constructor() { }
  getModules(): Observable<Modul[]> {
    //return this.http.get<Modul[]>('http://localhost:/admin/modul/all');
    return new Observable<Modul[]>(observer => {
      const moduls: Modul[] = [Generation.modul1,Generation.modul2]
      observer.next(moduls);
      observer.complete();
    });
  }
}
