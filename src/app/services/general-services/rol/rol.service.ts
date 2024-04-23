import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../../../models/Accounts-Models/rol';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) { }
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${environment.baseURL}/admin/Rol/all`);
  }
}
