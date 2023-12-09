import { Component, OnInit } from '@angular/core';
import { UNAME } from 'src/app/constants';
import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  followers : number = 0;
  following : number = 0;
  posts : number = 0;
  bio : string = '';
  userName : string = '';
  fullName : string = '';

  ngOnInit(): void {
    this.fetchAccountDetails();
    this.userName = this.tokenService.fetchToken(UNAME);
  }

  constructor(private accountService : AccountService,private tokenService : TokenService)  {

  }

  fetchAccountDetails() {
    this.accountService.fetchUserAccount().subscribe(resp => {
      console.log(Object(resp)['accountId']);
      var profileDetails = Object(resp)['accountHolder'];
      console.log(profileDetails.emailId);
    });
  }
}
