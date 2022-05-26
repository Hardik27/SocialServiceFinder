import { Component, OnInit } from '@angular/core';
import { Event } from '../users/models/Event';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { EventregistrationserviceService } from '../users/services/eventregistationservice/event-registration-service.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  UpdateEventObject!: any;
  eventName: string="";
  eventDescription: string="";
  eventRewards: string="";
  eventLocation: string="";
  eventPOCName: string="";
  eventPOCContact: string="";
  eventPOCEmail: string="";
  eventCity: string="";
  eventZip: string="";
  startDate!: Date;
  endDate!: Date;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private eventRegisterService:EventregistrationserviceService,private router: Router,
      private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.UpdateEventObject = JSON.parse(localStorage.getItem('currEvent') || '{}');
  }

  updateEvent(): void{
    if(this.eventName!=null && this.eventName.length>0){
      this.UpdateEventObject.name = this.eventName;
    }

    if(this.eventDescription!=null && this.eventDescription.length>0){
      this.UpdateEventObject.description = this.eventDescription;
    }

    if(this.eventRewards!=null && this.eventRewards.length>0){
      this.UpdateEventObject.rewards = Number(this.eventRewards);
    }

    if(this.eventLocation!=null && this.eventLocation.length>0){
      this.UpdateEventObject.address = this.eventLocation;
    }

    if(this.eventPOCName!=null && this.eventPOCName.length>0){
      this.UpdateEventObject.pocName = this.eventPOCName;
    }

    if(this.eventPOCContact!=null && this.eventPOCContact.length>0){
      this.UpdateEventObject.phoneNo = Number(this.eventPOCContact);
    }

    if(this.eventPOCEmail!=null && this.eventPOCEmail.length>0){
      this.UpdateEventObject.email = this.eventPOCEmail;
    }

    if(this.eventCity!=null && this.eventCity.length>0){
      this.UpdateEventObject.city = this.eventCity;
    }

    if(this.eventZip!=null && this.eventZip.length>0){
      this.UpdateEventObject.pinCode = Number(this.eventZip);
    }

    if(this.startDate!=null){
      this.UpdateEventObject.startDate = this.startDate;
    }

    if(this.endDate!=null){
      this.UpdateEventObject.endDate = this.endDate;
    }

    console.log(this.UpdateEventObject);
    this.eventRegisterService.updateEventDetails(this.UpdateEventObject).subscribe((res)=>{
      this._snackBar.open('Updation Successful!!', "",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      })
      console.log(res);
      this.router.navigateByUrl("/dashboard")
    },
    (err)=>{
      this._snackBar.open('Updation Failed!!', "",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
    });
  }

  isNumber(contact: any): boolean {
    return !isNaN(contact);
  }
}
