import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketingRequestDto, UserHistoryResponse, GraphData } from '../../DTO/marketingRequests.dto';
import { environment } from '../../../environments/environment';
import { StorageService } from '../login-services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.baseURL; // URL de la API Gateway
  //private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient, private storageService: StorageService) {}

  private getJwt() {
    const { jwt } = this.storageService.getSavedAccount()!
    return jwt.substring(1, jwt.length - 1)
  }

  sendMarketingData(formData: MarketingRequestDto): Observable<any> {
    const url = `${this.apiUrl}/marketing/request/manage`;
    return this.http.post<any>(url, formData, {headers: {'Authorization': this.getJwt()}});
  }
  
  getMarketingData(): Observable<MarketingRequestDto[]> {
    const url = `${this.apiUrl}/marketing/emails/visualization`; 
    return this.http.get<MarketingRequestDto[]>(url, {headers: {'Authorization': this.getJwt()}});
  }

  getUserHistory(): Observable<UserHistoryResponse> {
    return this.http.get<UserHistoryResponse>(`${this.apiUrl}/marketing/history-users`, {headers: {'Authorization': this.getJwt()}});
  }

  getGraphData(): Observable<GraphData> {
    return this.http.get<GraphData>(`${this.apiUrl}/marketing/stats`, {headers: {'Authorization': this.getJwt()}});
  }
}
