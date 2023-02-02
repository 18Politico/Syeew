import { Component } from '@angular/core';
import { AdminLoginService } from 'src/app/services/admin-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public name = '';
  public password = '';
  public email = '';
  public surname = '';

  constructor(private _loginService:AdminLoginService){}

  onSubmit(){

  }
}
