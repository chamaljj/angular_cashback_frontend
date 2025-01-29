import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators ,FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  registerForm:any = FormGroup;
  submitted = false;
  fieldTextType: boolean = false;
  unauthanticated: boolean = false;
  errorMessage = "";
  loginError: string ="";

userName = new FormGroup('', [Validators.required, Validators.email]);
password = new FormGroup('', [Validators.required]);


getErrorMessage() {
  if (this.userName.hasError('required')) {
    return 'You must enter valid email';
  }

  return this.userName.hasError('email') ? 'Not a valid email' : '';
}
  getPasswordErrorMessage() {
  if (this.password.hasError('required')) {
    return 'You must enter password';
  }
}

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        const role = response.user.role[0].roleName;


      if (loginForm){ this.router.navigate(['/home']);
      this.loginError = ' Login Successful';
    }

      else this.registerForm.setErrors({ unauthanticated: true });
      },

      (error) => {
        this.loginError = 'Invalid username or password.';
      }
    );
  }

  submit(){
    this.login(this.f);
    }

    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }

}
