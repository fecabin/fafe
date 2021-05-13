import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseCenterService {

  private baseUrl = 'http://localhost:8080/report/casecenter';

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getCaseCenterSummaries():Observable<any>{
    return this.http.get(`${this.baseUrl}/casesummaries`);
  }
  getCaseCenterSummariesByCond(qryDtFrom:string,qryDtTo:string,qryMask:string):Observable<any>{
    //http://localhost:8080/report/casecenter/casesummariescond?qryDtFrom=ABC
   
    qryMask="TMIG";
    const parms=new HttpParams()
      .set('qryDtFrom',qryDtFrom)
      .set('qryDtTo',qryDtTo)
      .set('qryMask',qryMask);
    return this.http.get(`${this.baseUrl}/casesummariescond`,{params:parms});

    
  }
  getCaseCenterSummariesByCondAfter(qryDtFrom:string,qryDtTo:string,qryMask:string):Observable<any>{
    //http://localhost:8080/report/casecenter/casesummariescond?qryDtFrom=ABC
   
    qryMask="TMIG";
    const parms=new HttpParams()
      .set('qryDtFrom',qryDtFrom)
      .set('qryDtTo',qryDtTo)
      .set('qryMask',qryMask);
    return this.http.get(`${this.baseUrl}/casesummariescondAfeter`,{params:parms});

    
  }
  updateDefectInfo(maskId:string,inspStartDt:string,defectId:string,defectSize:string,elePredict:string,eleActual:string, isPrpDefect:string): Observable<Object> {
    const parms=new HttpParams()
    .set('maskId',maskId)
    .set('inspStartDt',inspStartDt)
    .set('defectId',defectId)
    .set('defectSize',defectSize)
    .set('elementPredict',elePredict)
    .set('elementActual',eleActual)
    .set('isPrpDefect',isPrpDefect);
    return this.http.get(`${this.baseUrl}/updateDefectInfo`,{params:parms});
  }
  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
