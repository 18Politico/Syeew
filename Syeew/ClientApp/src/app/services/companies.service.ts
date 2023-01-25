import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from '../models/interfaces/ICompany';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private readonly _url = "https://localhost:7290/api/"

  constructor(private _http: HttpClient) { }

  AllCompanies(url: string): Observable<ICompany[]> {
    return this._http.get<ICompany[]>(this._url + url);
  }

  CompanyBy(name: string): Observable<ICompany> {
    return this._http.get<ICompany>(this._url + "Company/" + name);
  }

  /**
   * Gets all the companies
   */
  getCompanies(): Observable<ICompany[]> {
    return this._http.get<ICompany[]>(this._url + 'Company');
  }

  /**
   * CAMBIARE E SPOSTARE SUL BACK-END
   * returns all possibles activity types of companies
   */
  getActivityTypes(companies: ICompany[]): string[] {
    return Array.from(new Set(companies.filter(c => c.tipoAttivita.length > 0).map(c => c.tipoAttivita.trim())))
  }

}
