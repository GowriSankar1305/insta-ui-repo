import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../types/user';
import { Yrmn } from '../types/years-months';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegForm: FormGroup = new FormGroup({});
  years: string[] = ['Year'];
  months: string[] = ['Month'];
  days: string[] = [];
  modalContent: string = '';
  isDisabled: boolean = false;
  errorModal: any;
  successModal: any;
  
  constructor(private userService: UserService,private router: Router) {

  }

  ngOnInit(): void {
    this.initializeUser();
    this.fetchYearsAndMonths();
    this.days.push('Day');
    this.errorModal = new window.bootstrap.Modal(document.getElementById('errModal'));
    this.successModal = new window.bootstrap.Modal(document.getElementById('scssModal'));
  }

  initializeUser() {
    this.userRegForm = new FormGroup({
      'mobile': new FormControl('', Validators.required),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'fullName': new FormControl('', Validators.required),
      'userName': new FormControl('', Validators.required),
      'currentPassword': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
      'month': new FormControl('', Validators.required),
      'year': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required)
    });
  }

  fetchYearsAndMonths() {
    this.userService.fetchYearsAndMonths().subscribe(resp => {
      this.years = this.years.concat(resp.years);
      this.months = this.months.concat(resp.months);
    }, (error) => {
      console.error('unable to fetch years and months--> ' + JSON.stringify(error));
    });
  }

  getDays() {
    this.days = ['Day'];
    let mnth = this.userRegForm.value.month as string;
    if (mnth !== "Month") {
      this.userService.fetchDays({ 'month': this.userRegForm.value.month }).subscribe(resp => {
        this.days = this.days.concat(resp.days);
      }, (error) => {
        console.error('unable to fetch days--> ' + JSON.stringify(error));
      });
    }
  }

  createUser() {
    if (this.userRegForm.valid) {
      this.isDisabled = true;
      let user: User = {
        userName: this.userRegForm.value.userName as string,
        currentPassword: this.userRegForm.value.currentPassword as string,
        dateOfBirth: this.userRegForm.value.date + "-" + this.userRegForm.value.month + "-" + this.userRegForm.value.year,
        confirmPassword: this.userRegForm.value.confirmPassword as string,
        emailId: this.userRegForm.value.email as string,
        fullName: this.userRegForm.value.fullName as string,
        mobileNumber: this.userRegForm.value.mobile as string,
        gender: this.userRegForm.value.gender as string
      }
      this.userService.saveOrUpdateUser(user).subscribe(resp => {
        console.log("response from server " + resp);
        this.openSuccessModel();
      }, (error) => {
        this.isDisabled = false;
        if (error.status === 400) {
          this.modalContent = '';
          let alertMsg = '<ul>'
          Object.values(error.error).forEach(val => {
            alertMsg = alertMsg.concat('<li class="small">').concat(val as string).concat('</li>');
          });
          alertMsg = alertMsg.concat('</ul>');
          this.modalContent = alertMsg;
          this.openModal();
        }
        else {
          this.modalContent = '';
          this.modalContent = error.message;
          this.openModal();
        }
      });
    }
    else {
      this.modalContent = '';
      let alertMessage = '<ul>';
      if (this.userRegForm.get('userName')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">User name is required</li>');
      }
      if (this.userRegForm.get('currentPassword')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">Password is required</li>');
      }
      if (this.userRegForm.get('mobile')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">Mobile is required</li>');
      }
      if (this.userRegForm.get('fullName')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">Full name is required</li>');
      }
      if (this.userRegForm.get('confirmPassword')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">Password is required</li>');
      }
      if (this.userRegForm.get('currentPassword') !== this.userRegForm.get('confirmPassword')) {
        alertMessage = alertMessage.concat('<li class="small">Passwords are not matching</li>');
      }
      if (this.userRegForm.get('month')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">Month is required</li>');
      }
      if (this.userRegForm.get('year')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">Year is required</li>');
      }
      if (this.userRegForm.get('date')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">Date is required</li>');
      }
      if (this.userRegForm.get('gender')?.hasError('required')) {
        alertMessage = alertMessage.concat('<li class="small">Gender is required</li>');
      }
      alertMessage = alertMessage.concat('</ul>');
      this.modalContent = alertMessage;
      this.openModal();
    }
  }

  resetForm() {
    this.userRegForm.reset();
  }

  closeModal() {
    this.errorModal.hide();
  }

  openModal() {
    this.errorModal.show();
  }

  closeSuccessModal() {
    this.successModal.hide();
    this.router.navigate(['/user/login']);
  }

  openSuccessModel()  {
    this.successModal.show();
  }

}
