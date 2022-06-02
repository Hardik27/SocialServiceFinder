import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Event } from '../users/models/Event';
import {FetchMyEvents} from '../users/models/FetchMyEvents'
import { FetchMyRewards } from '../users/models/FetchMyRewards';
import { Organiser } from '../users/models/Organiser';
import { SearchQuery } from '../users/models/SearchQuery';
import { User } from '../users/models/User';
import { DashboardService } from '../users/services/dashboardservice/dashboard.service';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  loadIcon=faSpinner;
  user!: User;
  isUser!: boolean;
  organisation!: Organiser;
  panelOpenState = false;
  createEventObject!: Event;
  createEventFormPanelOpenState = false;
  eventName: string="";
  eventDescription: string="";
  eventRewards: string="";
  eventLocation: string="";
  eventPOCName: string="";
  eventPOCContact: string="";
  eventPOCEmail: string="";
  eventCity: string="";
  eventZip: string="";
  searchEventsQuery: string="";
  eventResult! : any[];
  searchQueryObject!:SearchQuery;
  startDate!: Date;
  endDate!: Date;
  eventReturn: string="";
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  events!: Event;
  id: string="";
  fetchMyEventsObject!:FetchMyEvents;
  myEvents!: any[];
  fetchMyRewardsObject!:FetchMyRewards;
  plusIcon=faPlus;
  buildingIcon=faBuilding;
  emailIcon=faEnvelope;
  addressIcon=faAddressCard;
  phoneIcon=faPhone;
  calendarIcon=faCalendar;
  helpIcon=faHandshake;
  coinIcon=faCoins;
  preferenceIcon=faCheckSquare;
  formattedEventStartDate: string="";
  formattedEventEndDate: string="";

  constructor(private dashboardService: DashboardService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.refreshCache();
    this.isUser = JSON.parse(localStorage.getItem('status') || '{}');
    if(this.isUser){
      this.user = JSON.parse(localStorage.getItem('userDetails') || '{}');
      console.log(this.user);
      this.fetchMyRewards(this.id);
    }else{
      this.organisation = JSON.parse(localStorage.getItem('orgDetails') || '{}');
      this.id=JSON.parse(localStorage.getItem('orgDetails') || '{}').id;
    }
  }

  refreshCache(): void{
    this.isUser = JSON.parse(localStorage.getItem('status') || '{}');
    if(this.isUser){
      var id=String(JSON.parse(localStorage.getItem('userDetails') || '{}').id);
      this.dashboardService.refreshUserCache(id).subscribe((res)=>{
        console.log("Refreshing the user cache");
        localStorage.setItem('userDetails', JSON.stringify(res));
        this.user=JSON.parse(localStorage.getItem('userDetails') || '{}');
      },
      (err)=>{
        console.log("Error in refreshing the cache");
      });
    }else{
      var id=String(JSON.parse(localStorage.getItem('orgDetails') || '{}').id);
      this.dashboardService.refreshOrganizerCache(id).subscribe((res)=>{
        console.log("Refreshing the org cache");
        localStorage.setItem('orgDetails', JSON.stringify(res));
      },(err)=>{
        console.log("Error in refreshing the cache");
      });
    }
  }

  createEvent(): void{
    this.createEventObject ={
      name: this.eventName,
      description: this.eventDescription,
      rewards: Number(this.eventRewards),
      address: this.eventLocation,
      pocName: this.eventPOCName,
      phoneNo: Number(this.eventPOCContact),
      email: this.eventPOCEmail,
      city: this.eventCity,
      pinCode: Number(this.eventZip),
      startDate: this.startDate,
      endDate: this.endDate,
      organizationId: this.id,
      deleted: false
    }

    console.log(this.createEventObject);
    
    this.dashboardService.createEvent(this.createEventObject).subscribe((res)=>{
      this._snackBar.open('Event Created!!', "",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
      this.clearForm();
    },
    (err)=>{
      this._snackBar.open('Failure: In Event Creation!!', "",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
    }
    )
  }

  getEventData(event: any): void{
    localStorage.setItem("currEvent", JSON.stringify(event));
    localStorage.setItem("myEvent",JSON.stringify(false));
  }

  getEventDataMyEvent(event: any): void{
    console.log(event)
    localStorage.setItem("currEvent", JSON.stringify(event));
    localStorage.setItem("myEvent",JSON.stringify(true));
  }

  searchEvents(): void{
    this.searchQueryObject={
      query: this.searchEventsQuery
    }

    console.log(this.searchQueryObject);
    this.dashboardService.searchEvents(this.searchQueryObject).subscribe((res)=>{
      this.eventReturn = JSON.stringify(res);
      this.eventResult=JSON.parse(this.eventReturn);
      this.searchEventsQuery="";
    },(err)=>{
      this.searchEventsQuery="";
      this._snackBar.open('Search Fetch Failed!!', "",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
    });
  }

  clearForm(): void{
    this.eventName="";
    this.eventDescription="";
    this.eventRewards="";
    this.eventLocation="";
    this.eventPOCName="";
    this.eventPOCContact="";
    this.eventPOCEmail="";
    this.eventCity="";
    this.eventZip="";
  }

  fetchMyEvents(): void{
    if(this.isUser){
      this.fetchMyEventsObject={
        id: JSON.parse(localStorage.getItem("userDetails") || '{}').id,
        isOrganizer: !this.isUser
      }
    }else{
      this.fetchMyEventsObject={
        
        id: JSON.parse(localStorage.getItem("orgDetails") || '{}').id,
        isOrganizer: !this.isUser
      }
    }
    
    this.dashboardService.fetchMyEvents(this.fetchMyEventsObject).subscribe((res)=>{
      console.log(res);
      this.myEvents=JSON.parse(JSON.stringify(res));
    }, (err)=>{
      this._snackBar.open('My Events Fetch Failed!!', "",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
    });
  }

  clearEventsResult(): void{
    this.myEvents=[];
  }

  fetchMyRewards(id: string): void{
    this.fetchMyRewardsObject={
      id: this.id
    };
    this.dashboardService.fetchMyRewards(this.fetchMyRewardsObject).subscribe((res)=>{
      this.user.rewards=(JSON.parse(JSON.stringify(res)).rewards);
    }, (err)=>{
      this._snackBar.open('Fetch Failed for my Rewards!!', "",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
    });
  }

  isNumber(contact: any): boolean {
    return !isNaN(contact);
  }

  formatDate(date: Date, isStartDate: boolean): void{
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var numericalDate=date.getDate();
    var day=dayArray[date.getDay()];
    var month=monthArray[date.getMonth()];
    var year=date.getFullYear();

    if(isStartDate){
      this.formattedEventStartDate=String(day)+" "+String(numericalDate)+" "+String(month)+", "+String(year);
    }else{
      this.formattedEventEndDate=String(day)+" "+String(numericalDate)+" "+String(month)+", "+String(year);
    }
  }
}