import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './_services/user-auth.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  `,
})

export class AppComponent implements OnInit {
      isOnline = true;

      title = 'angular-frontend';

    constructor(
      private userAuthService: UserAuthService,
      private router: Router,
      public userService: UserService,

      ) {}

    ngOnInit(): void {

    }

    public isLoggedIn() {
      return this.userAuthService.isLoggedIn();
    }

    public logout() {
      this.userAuthService.clear();
      this.router.navigate(['/']);
    }

    dropdowns: { [key: string]: boolean } = {};

    toggleDropdown(menu: string) {
      this.dropdowns[menu] = !this.dropdowns[menu];
    }

    @HostListener('window:beforeunload', ['$event'])
    handleTabClose(event: Event) {
    this.userAuthService.logout();
  }
}
