import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IQuantitativeData } from '../models/interfaces/IQuantitativeData';

@Injectable({
  providedIn: 'root'
})
export class QuantitativeDataService {

  private readonly _url = "https://localhost:7290/api/"

  constructor(private _http: HttpClient) { }

  AllQuantitativeData(url: string): Observable<IQuantitativeData[]> {
    return this._http.get<IQuantitativeData[]>(this._url + url);
    // return this._http.get<IQuantitativeData[]>(this._url + url).pipe(
    //   map(data => {
    //     const result: IQuantitativeData[] = [];
    //     for (const id in data){
    //       result.push(data[id])
    //     }
    //     return result;
    //   })
    // );
  }

}
