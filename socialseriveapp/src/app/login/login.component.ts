import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../users/models/Login';
import { DashboardService } from '../users/services/dashboardservice/dashboard.service';
import { LoginserviceService } from '../users/services/loginservice/loginservice.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { faEarth } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email : string = "";
  password : string = ""; 
  loginObject!: Login;
  userType: string = "User";
  options: string[] = ['User', 'Organiser'];
  earthIcon=faEarth;
  coinIcon=faCoins
  hourglassIcon=faHourglass
  searchIcon=faSearch;
  calendarIcon=faCalendar;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private loginserviceService: LoginserviceService, 
    private dashboardService: DashboardService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  
  login(): void {

    this.loginObject = {
      email: this.email,
      password: this.password
    }

    if(this.userType == "User"){
      this.loginserviceService.loginUser(this.loginObject).subscribe((res)=>{
        localStorage.setItem('userDetails', JSON.stringify(res));
        localStorage.setItem('status',JSON.stringify(true));
        localStorage.setItem('loginStatus', "1");
        this.dashboardService.setUser(res);
        this.router.navigateByUrl("/dashboard").then(() => {
          window.location.reload();
        });
      },
      (err)=>{
        this._snackBar.open('Login Failed!!', "",{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2000,
        });
      });
    }
    else if(this.userType == "Organiser"){
      this.loginserviceService.loginOrganiser(this.loginObject).subscribe((res)=>{
        localStorage.setItem('orgDetails', JSON.stringify(res));
        localStorage.setItem('status',JSON.stringify(false));
        localStorage.setItem('loginStatus', "1");
        this.dashboardService.setOrgniser(res);
        this.router.navigateByUrl("/dashboard").then(() => {
          window.location.reload();
        });
      },
      (err)=>{
        this._snackBar.open('Login Failed!!', "",{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2000,
        });
      });
    }
    else{
      console.log("No valid userType selected.");
    }
  }
}
