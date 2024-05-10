import { Injectable } from '@angular/core';
import { Module } from '../../../models/Accounts-Models/Module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModulsService {

  constructor(private http: HttpClient) { }
  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>('http://localhost:/admin/modul/all');
  }
}
