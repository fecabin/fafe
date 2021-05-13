import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrpDashboardService {

  private baseUrl = 'http://localhost:8080/report/prpDashboard';

  constructor(private http: HttpClient) { }

  getHighlight():Observable<any> {
    return this.http.get(`${this.baseUrl}/highlight`);
  }
  getPrpWeeklyTrend():Observable<any> {
    return this.http.get(`${this.baseUrl}/prpWeeklyTrend`);
  }
  getPrpMonthlyTrend():Observable<any> {
    return this.http.get(`${this.baseUrl}/prpMonthlyTrend`);
  }
  getPrpDefectElements():Observable<any> {
    return this.http.get(`${this.baseUrl}/prpDefectElements`);
  }
  getMaskStopLineTrend():Observable<any> {
    return this.http.get(`${this.baseUrl}/maskStopLineTrend`);
  }
  getPellicleRuptureTrend():Observable<any> {
    return this.http.get(`${this.baseUrl}/pellicleRuptureTrend`);
  }
  getGldnImgChanelTop10Trend():Observable<any> {
    return this.http.get(`${this.baseUrl}/pellicleRuptureTrend`);
  }

  getPrpDashboardByCond(qryDtFrom:string,qryDtTo:string):Observable<any>{
    const parms=new HttpParams()
      .set('qryDtFrom',qryDtFrom)
      .set('qryDtTo',qryDtTo)
    return this.http.get(`${this.baseUrl}/getPrpDashboardByCond`,{params:parms});
  }

  editPrpData(){

  }

}
