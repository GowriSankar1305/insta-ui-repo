import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit  {
  
  constructor(private authService : AuthService,
              private router : Router,
              private tokenService: TokenService) {

  }
  ngOnInit(): void {
    this.logOutTheUser();
  }

  logOutTheUser() {
    this.authService.logOutUser().subscribe(resp => {
      console.log('logout response--------> ' + resp);
    });
    this.tokenService.clearLocalStorage();
    this.router.navigate(['/user/login']);
  }
}
