import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../app.constants';
@Component({
  selector: 'app-view-merchant',
  templateUrl: './view-merchant.component.html',
  styleUrls: ['./view-merchant.component.css']
})

export class ViewMerchantComponent {

  searchText:any;
  p: number = 1;
  merchantForm!:FormGroup;
  submitted = false;
  MerchantArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentId ="";
  id: number = 0;
  mid: string="";
  status: string="";
  createdDate: string="";
  createdBy: string ="";
  modifiedBy: string="";
  modifiedDate: string="";

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router){

  this.getAllMerchant();
  }
  getAllMerchant()
  {
    this.isResultLoaded = true;
    this.http.get(API_ENDPOINTS.GETMERCHANT_URL)
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = false;
        this.MerchantArray = resultData;
    }, (error) => {

      this.isResultLoaded  = false;
    });
  }
  ngOnInit(): void {
  }
}
