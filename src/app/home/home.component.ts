import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  cashbackForm!:FormGroup;
  submitted = false;

  isResultLoaded = false;
  isUpdateFormActive = false;

  p: number = 1;
  searchText:any;
  searchID:any;
  CashbackArray : [] = [];
  currentId ="";
  id: number = 0;
  tranType: number=0;
  category: string="";
  minAMT: number =0;
  maxAMT: number =0;
  rate: number =0.0;
  startDate: string="";
  endDate: string="";
  count: number=0;
  customer: string="";
  createdDate: string="";
  status: string=""
  response: any;

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router){

  this.getAllCashback();
  }

  getAllCashback()
  {
    this.isResultLoaded = true;
    this.http.get(API_ENDPOINTS.GETCASHBACK_URL)

    .subscribe((resultData: any)=>
    {
      this.isResultLoaded = false;
      this.CashbackArray = resultData;
      console.log(resultData);
    },
    (error) => {
      this.isResultLoaded  = false;
    });
  }

  ngOnInit(): void {
  }
}
