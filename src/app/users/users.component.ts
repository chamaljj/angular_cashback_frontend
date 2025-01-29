import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { API_ENDPOINTS } from '../app.constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  show= false;
  UserArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  searchText: any;
  currentId ="";
  userName: string="";
  name: string="";
  password: string="";
  roleName: string="";

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService){
  this.getAllUsers();

  }

  getAllUsers()
  { this.isResultLoaded = true;
    this.http.get(API_ENDPOINTS.SIGNUP_USER_URL)

    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = false;
        this.UserArray = resultData;
    },(error) => {

      this.isResultLoaded  = false;
    });
  }
  setUpdate(data: any)
  {
    this.show = true;
    this.userName = data.userName;
    this.name= data.name;
    this.roleName = data.role[0].roleName;
    this.password="";
    this.currentId = data.userName;

  }

  UpdateRecords(id : any)
  {
    let bodyData = {
      "userName": this.currentId,
      "name" : this.name,
      "roleName" : this.roleName,
      "password": this.password,


    };

    this.http.put(API_ENDPOINTS.GETPASSWORD_URL+"/"+this.userName,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {

        alert("Successfully Updated.")
        this.closepopup();
        this.getAllUsers();
        this.userName="",
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

submit(){
  this.save();
}

  closepopup(){
    this.show = false;

  }
  closeoverlay(e:any){
    if(e.target.classList.contains('overlay')){
      this.show = false;
    }
  }
}



