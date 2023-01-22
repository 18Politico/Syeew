import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoxPlotDataDTO } from '../Utils/DTOs/BoxPlotDataDTO';
import { TemporalDataDTO } from '../Utils/DTOs/TemporalDataDTO';
import { RequestDataDTO } from '../Utils/DTOs/RequestDataDTO';
import { BoxPlotDataMonthDTO } from '../Utils/DTOs/BoxPlotDataMonthDTO';
import { ParameterDataDTO } from '../Utils/DTOs/ParameterDataDTO';
import { PieDataDTO } from '../Utils/DTOs/PieDataDTO';

@Injectable({
  providedIn: 'root'
})
export class PlotsService {

  private readonly _url = "https://localhost:7290/api/Plots"

  constructor(private _http: HttpClient) { }

  /**
   *
   * @param requestData
   * @returns
   */
  getBoxPlotDataDay(requestData: RequestDataDTO): Observable<BoxPlotDataDTO[]> {
    return this._http.post<BoxPlotDataDTO[]>(this._url + "/BoxPlotDataDay", requestData)
  }


  /*{

    monthLabels: string[]; ["Aprile","Giugno"]
    contentData: number[
      [1,2,3,4,5],
      [6,7,8,9,0]
    ];

  }*/
  /**
   *
   * @param requestData
   * @returns
   */
  getBoxPlotDataMonth(requestData: RequestDataDTO): Observable<BoxPlotDataMonthDTO> {
    return this._http.post<BoxPlotDataMonthDTO>(this._url + "/BoxPlotDataMonth", requestData)
  }

  /**
   * Returns
   * @param requestData
   * @returns
   */
  getPieDataMonth(requestData: RequestDataDTO): Observable<PieDataDTO[]> {
    return this._http.post<PieDataDTO[]>(this._url + "/PieDataMonth", requestData)
  }

  /**
   *
   * @param requestData
   * @returns
   */
  getTemporalDataDay(requestData: RequestDataDTO): Observable<TemporalDataDTO[]> {
    return this._http.post<TemporalDataDTO[]>(this._url + "/TemporalDataDay", requestData)
  }

  /**
   * [
   *  {
   *    x: number;
   *    y: number[];
   *  },{
   *    x: number;
   *    y: number[];
   *  },{
   *    x: number;
   *    y: number[];
   *  }
   * ]
   * @param requestData 
   * @returns 
   */
  getParametersDataDay(requestData: RequestDataDTO): Observable<ParameterDataDTO[]> {
    return this._http.post<ParameterDataDTO[]>(this._url + "/ParameterDataDay", requestData)
  }

  

}
