import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { API_ENDPOINTS } from '../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-cashback',
  templateUrl: './add-cashback.component.html',
  styleUrls: ['./add-cashback.component.css'],
})
export class AddCashbackComponent implements OnInit {
  minAmt = 0;
  cashbackForm!: FormGroup;
  submitted = false;
  tranTypeArray: any[] = [];
  CashbackArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId = '';
  id: number = 0;
  tranType: number = 0;
  customer: string = '';
  minAMT: number = 0;
  maxAMT: number = 0;
  rate: number = 0;
  startDate: string = '';
  endDate: string = '';
  count: number = 0;
  category: string = '';
  status: string = 'N';
  cashback_fixed_amt: number = 0;
  initiator: boolean = false;
  mcc: boolean = false;
  channel: boolean = false;
  delFlag: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.getAllCashback();
    this.getAllTranTypes();
  }

  getAllCashback() {
    this.http
      .get(API_ENDPOINTS.GETCASHBACK_URL)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.CashbackArray = resultData;
      });
  }
  getAllTranTypes() {
    this.http
      .get(API_ENDPOINTS.GETTRANTYPE_URL)
      .subscribe((resultDatas: any) => {
        this.isResultLoaded = true;
        this.tranTypeArray = resultDatas;
      });
  }

  register() {
    let bodyData = {
      id: this.currentId,
      tranType: this.tranType,
      mid: false,
      minAMT: this.minAMT,
      maxAMT: this.maxAMT,
      rate: this.rate,
      startDate: this.startDate,
      endDate: this.endDate,
      count: this.count,
      customer: this.customer,
      category: this.category,
      status: this.status,
      cashback_fixed_amt: 0,
      initiator: false,
      mcc: false,
      channel: false,
      delFlag: 'N',
    };

    this.http
      .post(API_ENDPOINTS.GETCASHBACK_URL, bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        this.snackBar.open('Cashback Add Successfully.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']
        });

        this.getAllCashback();
        this.id = 0;
        this.tranType = 0;
        this.minAMT = 0;
        this.maxAMT = 0;
        this.rate = 0;
        this.startDate = '01/01/2000';
        this.endDate = '01/01/2000';
        this.count = 0;
        this.customer = 'N';
        this.category = 'N';
        this.status = 'N';
        this.cashback_fixed_amt = 0;
        this.initiator = false;
        this.mcc = false;
        this.channel = false;
        this.delFlag = 'N';
      });
  }

  save() {
    if (this.currentId == '') {
      this.register();
    } else {
    }
  }

  ngOnInit(): void {}

  formdata: any = {};

  submit() {
    this.save();
  }
}
