import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IQuantitativeData } from '../models/interfaces/IQuantitativeData';
import { AdminLoginService } from './admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class QuantitativeDataService {

  private readonly _url = "https://localhost:7290/api/QuantitativeData"

  constructor(private _http: HttpClient, private _loginService: AdminLoginService) { }

  AllQuantitativeData(): Observable<IQuantitativeData[]> {
    return this._http.get<IQuantitativeData[]>(this._url);
  }

  DatasOf(companyName: string): Observable<IQuantitativeData[]> {
    return this._http.get<IQuantitativeData[]>(this._url + "/QuantitativeDatasOf?companyWithName=" + companyName, { headers: this._loginService.getRequiredHeaders() });
  }

}
