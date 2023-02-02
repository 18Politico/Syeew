import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtDTO } from '../Utils/DTOs/JwtDTO'
import { RegisterDTO } from '../Utils/DTOs/RegisterDTO'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDTO } from '../Utils/DTOs/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService implements CanActivate {

  private readonly _url = "https://localhost:7290/api/"

  constructor(public router: Router, private _http: HttpClient) { }

  login(username: string, password: string): Observable<JwtDTO> {
    let user: LoginDTO = { name: username, password: password }
    return this._http.post<JwtDTO>(this._url + 'AdminLogin', user)
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null
  }

  getToken(): string {
    return localStorage.getItem('token') as string
  }

  logout(): void {
    localStorage.clear()
  }

  register(name: string, password: string, email: string, surname: string): Observable<any> {
    let registerDto: RegisterDTO = { name: name, password: password, email: email, surname: surname }
    return this._http.post<any>(this._url + 'Admin/RegisterNewAdmin', registerDto)
  }

  getRequiredHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
  }
}
