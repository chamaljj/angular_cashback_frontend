import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { API_ENDPOINTS } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData:any) {
    return this.httpclient.post(API_ENDPOINTS.LOGIN_URL, loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(API_ENDPOINTS.SIGNUP_USER_URL, {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpclient.get(API_ENDPOINTS.SIGNUP_ADMIN_URL, {
      responseType: 'text',
    });
  }

  public roleMatch( allowedRoles:any ): boolean |undefined {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName == allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}