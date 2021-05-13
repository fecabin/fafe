import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaskComonService {

  private baseUrl = 'http://localhost:8080/report/cmmn';

  constructor(private http: HttpClient) { }

  getMaskSelOption():Observable<any> {
    return this.http.get(`${this.baseUrl}/maskSelOption`);
  }
  getㄋtageSelOption():Observable<any> {
    return this.http.get(`${this.baseUrl}/stageSelOption`);
  }
  getMaskInspSelOption():Observable<any> {
    return this.http.get(`${this.baseUrl}/maskInspToolSelOption`);
  }
  getLayerSelOption():Observable<any> {
    return this.http.get(`${this.baseUrl}/getLayerSelOption`);
  }
}
