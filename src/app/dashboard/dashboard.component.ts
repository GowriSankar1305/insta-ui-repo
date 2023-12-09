import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   likeBtnClr = 'grey';
   didLike = false;

  constructor(private userService: UserService) {

  }

   ngOnInit(): void {
      this.doSomeThing();
   }

   doSomeThing()  {
    this.userService.fetchUser(JSON.parse('{"userId":"10"}')).subscribe(resp => {
      console.log(resp);
    },(error) => {
      console.log(error);

    }); 
   }
   checkLikeCount()  {
    if(this.didLike == false) {
      this.didLike = true;
      this.likeBtnClr = 'red';
    }else {
      this.didLike = false;
      this.likeBtnClr = 'grey';
    }
   }
}
