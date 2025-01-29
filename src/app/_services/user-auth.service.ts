import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  isUserAuthenticated() {
    throw new Error('Method not implemented.');
  }

  public setRoles(roles: [],) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken(jwtToken: string): void {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')!;
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
  constructor(private router: Router) {}

  logout() {

    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userInfo');


    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Check if the user token exists in session storage
    return sessionStorage.getItem('userToken') !== null;
  }
}
