import { Injectable } from '@angular/core';
import { UserregistrationService } from '../userregistrationservice/userregistration.service';
import { User } from '../../models/User';
import { Organiser } from '../../models/Organiser';
import { Observable } from 'rxjs';
import { Event } from '../../models/Event';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private user!: User;
  public isUser!: boolean; 
  private organisation!: Organiser;
  private apiServerUrlUser = environment.baseUrlEvent;
  constructor(private http: HttpClient) { }

  public setUser(user :User){
    this.user = user;
    this.isUser = true;
  }

  public setOrgniser(organiser :Organiser){
    this.organisation = organiser;
    this.isUser = false;
  }

  public getUser():User{
    return this.user;
  }

  public getOrganiser():Organiser{
    return this.organisation;
  }

  public createEvent(Event: Event): Observable<Event>{
    console.log("Sending User POST");
    var url=`${this.apiServerUrlUser}/event`;
    console.log(url);
    console.log("Sending the following object");
    console.log(Event);
    return this.http.post<Event>(url, Event);
  }
}
