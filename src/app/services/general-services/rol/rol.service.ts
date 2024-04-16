import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../../../models/Accounts-Models/rol';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) { }
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>('http://localhost:/admin/Rol/all');
  }
}
