import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLoginService } from 'src/app/services/admin-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username = '';
  public password = '';

  constructor(private _route: ActivatedRoute, private _router: Router, private _loginService: AdminLoginService
  ) {
  }

  public onSubmit(): void {
    console.log(this.username, this.password)
    this._loginService.login(this.username, this.password).subscribe(jwt => {
      localStorage.setItem('token', jwt.token)
      this._router.navigateByUrl('/aziende')
    })
  }
}