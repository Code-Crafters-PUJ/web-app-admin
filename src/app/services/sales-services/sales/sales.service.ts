import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanDTO } from '../../../DTO/sales.dto';
import { environment } from '../../../../environments/environment';
import { Service } from '../../../models/sales-models/service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  getSalesData(): Observable<{plans: PlanDTO[]}> {
    return this.http.get<{plans: PlanDTO[]}>(`${this.apiUrl}/clients/plans/all`);
  }

  createPlan(planData: PlanDTO): Observable<PlanDTO> {
    return this.http.post<PlanDTO>(`${this.apiUrl}/clients/plans/`, planData);
  }

  getServices(): Observable<{services: Service[]}>{
    return this.http.get<{services: Service[]}>(`${this.apiUrl}/clients/services/all`);
  }
}
