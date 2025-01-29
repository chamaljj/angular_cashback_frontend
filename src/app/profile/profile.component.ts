
import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { API_ENDPOINTS } from '../app.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit{

  show= false;

  UserArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  userName: string="";
  name: string="";
  password: string="";
  roleName: string="";

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService,private userAuthService: UserAuthService,){
    this.getUser();
  }

  getUser()
  {
    const userRoles: any = this.userAuthService.getRoles();
    const token = this.userAuthService.getToken();
    const decodeToken: string = jwt_decode(token);

    const email: unknown= decodeToken.sub;

    this.userName = email as string;

    this.http.get(API_ENDPOINTS.SIGNUP_USER_URL+"/"+this.userName)

    .subscribe((resultData: any)=>
    {
      this.isResultLoaded = true;
        this.UserArray = resultData;

      this.name = resultData.name;
      this.roleName = resultData.roleName;
    });
  }

  setUpdate(userName: any)
  {const userRoles: any = this.userAuthService.getRoles();
    const token = this.userAuthService.getToken();
    const decodeToken: string = jwt_decode(token);

    const email: unknown= decodeToken.sub;
    this.userName = email as string;
    this.show = true;
    this.http.get(API_ENDPOINTS.SIGNUP_USER_URL+"/"+this.userName)

    .subscribe((resultData: any)=>
    {
      this.isResultLoaded = true;
        this.UserArray = resultData;

      this.name = resultData.name;
      this.roleName = resultData.roleName;
      this.password="";
      this.currentId = resultData.userName;
    });
  }

  UpdateRecords(id : any)
  {
    let bodyData = {
      "userName": this.currentId,
      "name" : this.name,
      "roleName" : this.roleName,
      "password": this.password
    };

    this.http.put(API_ENDPOINTS.GETPASSWORD_URL+"/"+this.userName,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(bodyData)

        alert("Successfully Updated.")
        this.closepopup();
        this.getUser();
        this.userName=this.currentId,
        this.name="",
        this.password="";
        this.roleName="";
    });
  }
  save()
  {
  if(this.currentId == '')
    {
      console.log();
      this.UpdateRecords(this.userName);
     }
    else
    {
      console.log("save");
      this.UpdateRecords(this.userName);
    }
  }
  ngOnInit(): void {

}

closepopup(){
  this.show = false;
}

closeoverlay(e:any){
  if(e.target.classList.contains('overlay')){
    this.show = false;
  }
}

submit(){
  this.save();
}
}
