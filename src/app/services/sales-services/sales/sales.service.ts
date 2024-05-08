import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanDTO } from '../../../DTO/sales.dto';
import { environment } from '../../../../environments/environment';
import { Service } from '../../../models/sales-models/service';
import { Trials } from '../../../models/sales-models/trial';
import { Coupon } from '../../../models/sales-models/coupon';
import { StorageService } from '../../login-services/storage.service';
import { ServiceDto } from '../../../DTO/service.dto';
import { CouponDto } from '../../../DTO/coupon.dto';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = environment.baseURL;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getToken(): string {
    const savedAccount = this.storageService.getSavedAccount();
    var jwt = savedAccount?.jwt;
    if (!jwt) {
      throw new Error('JWT token is not defined.');
    }
    return jwt
  }

  getSalesData(): Observable<{ plans: PlanDTO[] }> {
    return this.http.get<{ plans: PlanDTO[] }>(`${this.apiUrl}/clients/plans/all`, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }

  createPlan(planData: PlanDTO): Observable<PlanDTO> {
    return this.http.post<PlanDTO>(`${this.apiUrl}/clients/plans/`, planData, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }

  getServices(): Observable<{ services: Service[] }> {
    return this.http.get<{ services: Service[] }>(`${this.apiUrl}/clients/services/all`, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }

  createService(service: ServiceDto): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/clients/services`, service, {
      headers: {
        Authorization: this.getToken()
      }
    })
  }

  updateService(name: string, state: boolean): Observable<any> {
    return this.http.put<Observable<any>>(`${this.apiUrl}/clients/services/${name}`, {
      state
    }, {
      headers: {
        Authorization: this.getToken()
      }
    })
  }

  deleteService(name: string): Observable<any> {
    return this.http.delete<Observable<any>>(`${this.apiUrl}/clients/services/${name}`, {
      headers: {
        Authorization: this.getToken()
      }
    })
  }

  getTrials(): Observable<{ trials: Trials[] }> {
    return this.http.get<{ trials: Trials[] }>(`${this.apiUrl}/clients/trials/all`, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }

  getCoupons(): Observable<{ coupons: Coupon[] }> {
    return this.http.get<{ coupons: Coupon[] }>(`${this.apiUrl}/clients/coupons/all`, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }

  createCoupon(coupon: CouponDto): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/clients/coupons`, coupon, {
      headers: {
        Authorization: this.getToken()
      }
    })
  }
  updateCoupon(code: string, coupon: Partial<CouponDto>): Observable<any> {
    return this.http.put<Observable<any>>(`${this.apiUrl}/clients/coupons/${code}`, coupon, {
      headers: {
        Authorization: this.getToken()
      }
    })
  }
  deleteCoupon(code: string): Observable<any> {
    return this.http.delete<Observable<any>>(`${this.apiUrl}/clients/coupons/${code}`, {
      headers: {
        Authorization: this.getToken()
      }
    })
  }
}
