import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanDTO, ServiceDTO } from '../../../DTO/sales.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  getSalesData(): Observable<{plans: PlanDTO[]}> {
    return this.http.get<{plans: PlanDTO[]}>(`${this.apiUrl}/plans/all`);
  }

  createPlan(planData: PlanDTO): Observable<PlanDTO> {
    return this.http.post<PlanDTO>(`${this.apiUrl}/plans/`, planData);
  }

  /*getServices(): Observable<ServiceDTO[]>{
    return this.http.get<ServiceDTO>(`${this.apiUrl}/services/all`);
  }*/
}
