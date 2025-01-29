import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup, FormControl ,FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { API_ENDPOINTS } from '../app.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
    form!: FormGroup;
    submitted = false;
    isResultLoaded = false;
    isUpdateFormActive = false;
    UserArray : any[] = [];

    currentUserID = "";
    uName: string="";
    userName : string="";
    uPassword : string="";
    roleName: string="";

    constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {}

  register()
  {
  let bodyData = {
    "name" : this.uName,
    "userName" : this.userName,
    "password" : this.uPassword,
    "roleName" : this.roleName
  };

  this.http.post(API_ENDPOINTS.SIGNUP_USER_URL,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
  {
      alert("Registered Successfully");
      this.uName = '';
      this.userName = '';
      this.uPassword ='';
      this.roleName ='';
    });
  }
  adminRegister()
  {
  let bodyData = {
    "name" : this.uName,
    "userName" : this.userName,
    "password" : this.uPassword,
    "roleName" : this.roleName
  };

  this.http.post(API_ENDPOINTS.SIGNUP_ADMIN_URL,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
  {
      console.log(resultData);
      alert("Registered Successfully.");
      this.uName = '';
      this.userName = '';
      this.uPassword ='';
      this.roleName = '';
    });
  }
  save(){

  if(this.currentUserID == '')
    {
      if(this.roleName =='User'){
        this.register();
      }
      else if(this.roleName =='Admin'){
        this.adminRegister();
      }
     }
    else
    {
      alert('Not register');
    }
  }

  ngOnInit(): void {
  }

  formdata:any={};
  submit(){
      this.save();
    }
}
