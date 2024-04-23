import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketingRequestDto } from '../../DTO/marketingRequests.dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private apiUrl = 'https://api.cracknd.com'; // URL de la API Gateway
  private apiUrl = 'http://localhost:3000'
  
  constructor(private http: HttpClient) {}

  // Método para enviar datos de marketing
  sendMarketingData(formData: MarketingRequestDto): Observable<any> {
    const url = `${this.apiUrl}/marketing/send`; // Endpoint específico para enviar datos de marketing
    return this.http.post<any>(url, formData);
  }

  // Método para obtener datos de marketing
  getMarketingData(): Observable<MarketingRequestDto[]> {
    const url = `${this.apiUrl}/marketing/retrieve`; // Endpoint para obtener datos
    return this.http.get<MarketingRequestDto[]>(url);
  }
}