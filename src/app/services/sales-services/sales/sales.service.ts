import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlansDTO, ServiceDTO} from '../../../DTO/sales.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  getSalesData(): Observable<PlansDTO[]> {
    return this.http.get<PlansDTO[]>(`${this.apiUrl}/plans/all`);
  }

  createPlan(planData: PlansDTO): Observable<PlansDTO> {
    return this.http.post<PlansDTO>(`${this.apiUrl}/plans/`, planData);
  }

  /*getServices(): Observable<ServiceDTO[]>{
    return this.http.get<ServiceDTO>(`${this.apiUrl}/services/all`);
  }*/
}
