import { Component, OnInit } from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginStatus: string="";
  dashboardIcon=faHome;
  userIcon=faUser;
  phoneIcon=faPhone;
  logoutIcon=faSignOut;
  loginIcon=faSignIn;
  registerIcon=faUserPlus;
  redeemIcon=faGift;
  constructor() { }

  ngOnInit(): void {
    this.loginStatus=JSON.parse(localStorage.getItem('loginStatus') || "");
  }

  logout(): void{
    this.loginStatus="";
    localStorage.clear();
  }

}
