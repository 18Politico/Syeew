import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService implements CanActivate {

  private isAuthenticated: boolean

  constructor(public router: Router) {
    this.isAuthenticated = false
  }

  public login(username: string, password: string) {

  }

  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }

}
