import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../app.constants';

@Component({
  selector: 'app-customer-credit',
  templateUrl: './customer-credit.component.html',
  styleUrls: ['./customer-credit.component.css']
})
export class CustomerCreditComponent implements OnInit{

  customerCreditForm!:FormGroup;
  submitted = false;
  isResultLoaded = false;
  isUpdateFormActive = false;
  p: number = 1;
  searchText:any;
  CustomerCreditArray : [] = [];
  response: any;

  currentId ="";
  tranId: string="";
  customerAcntNo: string="";
  txnAmount: number =0;
  status: string=""
  txnType: string="";
  txnDate: string="";
  cif:  string="";
  merchantName: string="";

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router){

  this.getAllCustomerCredit();
  }

  getAllCustomerCredit()
  {
    this.isResultLoaded = true;
    this.http.get(API_ENDPOINTS.GETCUSTOMERCREDIT_URL)
    .subscribe((resultData: any)=>
    {
        this.CustomerCreditArray = resultData;
        this.isResultLoaded = false;
    },
    (error) => {
      this.isResultLoaded  = false;
    });
  }
  ngOnInit(): void {}
}
