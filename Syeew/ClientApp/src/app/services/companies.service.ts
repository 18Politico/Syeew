import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from '../models/interfaces/ICompany';
import { AdminLoginService } from './admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private readonly _url = "https://localhost:7290/api/"

  constructor(private _http: HttpClient, private _loginService: AdminLoginService) { }

  AllCompanies(url: string): Observable<ICompany[]> {
    return this._http.get<ICompany[]>(this._url + url, { headers: this._loginService.getRequiredHeaders() });
  }

  CompanyBy(name: string): Observable<ICompany> {
    return this._http.get<ICompany>(this._url + "Company/" + name, { headers: this._loginService.getRequiredHeaders()});
  }

  /**
   * Gets all the companies
   */
  getCompanies(): Observable<ICompany[]> {
    return this._http.get<ICompany[]>(this._url + 'Company', { headers: this._loginService.getRequiredHeaders() });
  }

  /**
   * CAMBIARE E SPOSTARE SUL BACK-END
   * returns all possibles activity types of companies
   */
  getActivityTypes(companies: ICompany[]): string[] {
    return Array.from(new Set(companies.filter(c => c.tipoAttivita.length > 0).map(c => c.tipoAttivita.trim())))
  }

}
