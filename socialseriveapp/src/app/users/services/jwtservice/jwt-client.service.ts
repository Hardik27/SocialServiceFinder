import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { Login } from '../../models/Login';


@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  private apiServerUrlUser = environment.baseUrlUser;
  private apiServerUrlOrg = environment.baseUrlOrg;

  constructor(private http: HttpClient) { }

  public generateToken(request: Login){
    return this.http.post<User>(`${this.apiServerUrlUser}/user/login`,request, {responseType: 'text' as 'json'});
  }
}
