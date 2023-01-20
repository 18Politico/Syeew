import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoxPlotData } from '../Utils/DTOs/BoxPlotData';

@Injectable({
  providedIn: 'root'
})
export class PlotsService {

  private readonly _url = "https://localhost:7290/api/Plots"

  constructor(private _http: HttpClient) { }

  getBoxPlotDataDay(companyName: string, dateFrom: Date, dateTo: Date, content: string): Observable<BoxPlotData[]> {
    return this._http.get<BoxPlotData[]>(this._url + "/BoxPlotDataDay?companyWithName=" + companyName + "?from=" + dateFrom + "?to=" + dateTo + "?content=" + content)
  }

  getBoxPlotDataMonth(companyName: string, dateFrom: Date, dateTo: Date, content: string): Observable<BoxPlotData[]> {
    return this._http.get<BoxPlotData[]>(this._url + "/BoxPlotDataMonth?companyWithName=" + companyName + "?from=" + dateFrom + "?to=" + dateTo + "?content=" + content)
  }

  getData(companyName: string, dateFrom: Date, dateTo: Date, content: string): Observable<[]> {
    return this._http.get<[]>(this._url + "/Data?companyWithName=" + companyName + "?from=" + dateFrom + "?to=" + dateTo + "?content=" + content)
  }

}
