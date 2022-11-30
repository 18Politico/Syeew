import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuantitativeData } from '../models/interfaces/IQuantitativeData';

@Injectable({
  providedIn: 'root'
})
export class QuantitativeDataService {

  private readonly _url = "https://localhost:7290/api/"

  constructor(private _http: HttpClient) { }

  AllQuantitativeData(url: string) {
    var response = this._http.get<IQuantitativeData[]>(this._url + url);
    return response;
  }
}
