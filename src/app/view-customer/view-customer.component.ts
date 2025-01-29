import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../app.constants';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit{

  customerForm!:FormGroup;
  submitted = false;
  isLoading: boolean = false;
  p: number = 1;
  searchText:any;
  CustomerArray : [] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentId ="";
  customerId: number = 0;
  id: number=0;
  createdDate: string="";
  createdBy: string ="";
  modifiedBy: string="";
  modifiedDate: string="";
  delFlag: string="";
  status: string="";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){

  this.getAllCustomer();
  }

  getAllCustomer()
  {this.isResultLoaded = true;
    this.http.get(API_ENDPOINTS.GETCUSTOMER_URL)
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = false;
        this.CustomerArray = resultData;
        console.log(resultData);
    },
    (error) => {

      this.isResultLoaded  = false;
    });
  }

  ngOnInit(): void {
  }
}
