import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../users/services/loginservice/loginservice.service';


@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginserviceService) { }

  ngOnInit(): void {
    this.loginService.logOut();
    this.router.navigate(['login']);
  }

}
