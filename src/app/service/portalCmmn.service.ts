import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortalCmmnService {

  private baseUrl = 'http://localhost:8080/report/portalCmmn';

  constructor(private http: HttpClient) { }

  getFunctionTreeCtrl():Observable<any> {
    return this.http.get(`${this.baseUrl}/functionTreeEnable`);
  }
}
