import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Event } from '../users/models/Event';
import { FetchMyEvents } from '../users/models/FetchMyEvents';
import { Organiser } from '../users/models/Organiser';
import { SearchQuery } from '../users/models/SearchQuery';
import { User } from '../users/models/User';
import { DashboardService } from '../users/services/dashboardservice/dashboard.service';
import { EventRegistration } from '../users/models/EventRegistration';
import { EventregistrationserviceService } from '../users/services/eventregistrationservice/eventregistrationserive.service';



@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event!: any;
  eventId: string="";
  userId: string="";
  eventRegistrationObject!: EventRegistration;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private eventRegisterService:EventregistrationserviceService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.event = JSON.parse(localStorage.getItem('currEvent') || '{}');
    this.eventId = JSON.parse(localStorage.getItem('currEvent') || '{}').id;
    this.userId = JSON.parse(localStorage.getItem('userDetails') || '{}').id;
    console.log(this.event);
  }



  registerEvent(): void{
    this.eventRegistrationObject = {
      usedId: this.userId,
      eventId: this.eventId
    }

    this.eventRegisterService.registerForEvent(this.eventRegistrationObject).subscribe((res)=>{
      console.log(res);
    },
    (err)=>{
      this._snackBar.open('Registartion Failed!!', "",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
    });

  }
}
