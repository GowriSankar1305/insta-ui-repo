import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../types/login';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { TOKEN,UNAME,LOGIN_TKN, USR_ACC_ID, USR_PROFILE_ID } from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFrm: FormGroup = new FormGroup({});
  errorMsg: string = '';
  isDisabled : boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenservice: TokenService) {
  }

  ngOnInit(): void {
    this.initializeLoginFrm();  
  }

  loginUser() {
    if(!this.loginFrm.valid) {
      this.errorMsg = 'Please enter user name and password';
    }
    else  {
      this.isDisabled = true;
      let loginReq : LoginRequest = {
        userName : this.loginFrm.get('userName')?.value,
        password : this.loginFrm.get('password')?.value
      }
      this.authService.loginUser(loginReq).subscribe(resp => {
        this.tokenservice.addToken(TOKEN,Object(resp)[TOKEN]);
        this.tokenservice.addToken(UNAME,Object(resp)[UNAME]);
        this.tokenservice.addToken(LOGIN_TKN,Object(resp)[LOGIN_TKN]);
        this.tokenservice.addToken(USR_ACC_ID,Object(resp)[USR_ACC_ID]);
        this.tokenservice.addToken(USR_PROFILE_ID,Object(resp)[USR_PROFILE_ID]);
        this.router.navigate(['/user/dashboard']);
      },
      (error) => {
        this.isDisabled = false;
        console.log(error.error.errorMsg);
        this.errorMsg = error.error.errorMsg;
        this.loginFrm.get('userName')?.setValue('');
        this.loginFrm.get('password')?.setValue('');
      });
    }
  }

  initializeLoginFrm()  {
    this.loginFrm = new FormGroup({
      'userName' : new FormControl('',Validators.required),
      'password' : new FormControl('',Validators.required)
    });
  }
}
