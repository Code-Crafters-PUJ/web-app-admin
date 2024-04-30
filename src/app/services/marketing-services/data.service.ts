import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketingRequestDto, UserHistoryResponse, GraphData } from '../../DTO/marketingRequests.dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private apiUrl = 'https://api.cracknd.com'; // URL de la API Gateway
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  

  sendMarketingData(formData: MarketingRequestDto): Observable<any> {
    const url = `${this.apiUrl}/api/request/manage`;
    return this.http.post<any>(url, formData);
  }
  
  getMarketingData(): Observable<MarketingRequestDto[]> {
    const url = `${this.apiUrl}api/emails/visualization`; 
    return this.http.get<MarketingRequestDto[]>(url);
  }

  getUserHistory(): Observable<UserHistoryResponse> {
    return this.http.get<UserHistoryResponse>(`${this.apiUrl}/api/history-users`);
  }

  getGraphData(): Observable<GraphData> {
    return this.http.get<GraphData>(`${this.apiUrl}/api/stats`);
  }
}
