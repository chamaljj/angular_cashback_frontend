import { UserService } from '../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../app.constants';
import { AppComponent } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-cashback',
  templateUrl: './update-cashback.component.html',
  styleUrls: ['./update-cashback.component.css'],
})
export class UpdateCashbackComponent implements OnInit {
  show = false;
  cashbackForm!: FormGroup;
  submitted = false;
  tranTypeArray: any[] = [];
  CashbackArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  p: number = 1;
  view = false;
  searchText: any;

  currentId = '';
  id: number = 0;
  tranType: number = 0;
  customer: boolean = false;
  minAMT: number = 0;
  maxAMT: number = 0;
  rate: number = 0.0;
  startDate: string = '';
  endDate: string = '';
  count: number = 0;
  category: boolean = false;
  status: string = '';
  cashback_fixed_amt: number = 0;
  createdDate: string = '';
  createdBy: string = '';
  modifiedBy: string = '';
  modifiedDate: string = '';
  delFlag: string = '';
  mid: boolean = false;
  initiator: boolean = false;
  mcc: boolean = false;
  channel: boolean = false;

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
    this.isResultLoaded = true;
    this.http
      .get(API_ENDPOINTS.GETCASHBACK_URL)

      .subscribe((resultData: any) => {
        this.isResultLoaded = false;
        this.CashbackArray = resultData;
      },(error) => {
        this.isResultLoaded  = false;
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
  setUpdate(data: any) {
    this.show = true;
    this.id = data.id;
    this.tranType = data.tranType;
    this.category = data.category;
    this.minAMT = data.minAMT;
    this.maxAMT = data.maxAMT;
    this.rate = data.rate;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.count = data.count;
    this.customer = data.customer;
    this.status = data.status;
    this.currentId = data.id;
  }

  UpdateRecords(id: any) {
    let bodyData = {
      id: this.currentId,
      tranType: this.tranType,
      mid: this.mid,
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
      .put(API_ENDPOINTS.GETCASHBACK_URL+ '/' + this.id, bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        this.snackBar.open('Cashback Details Updated Successfully.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']});
        this.closepopup();
        this.getAllCashback();
        this.id = 0;
        this.tranType = 0;
        this.category =false;
        this.minAMT = 0;
        this.maxAMT = 0;
        this.rate = 0;
        this.startDate = '';
        this.endDate = '';
        this.count = 0;
        this.customer = false;
        this.status = '';
      });
  }
  save() {
    if (this.currentId == '') {
    } else {
      this.UpdateRecords(this.id);
    }
  }

  setDelete(data: any) {
    this.http
      .delete(API_ENDPOINTS.GETCASHBACK_URL + '/' + data.id, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        alert('Cashback Deleted.');
        this.getAllCashback();
        this.id = 0;
        this.tranType = 0;
        this.category =false;
        this.minAMT = 0;
        this.maxAMT = 0;
        this.rate = 0;
        this.startDate = '';
        this.endDate = '';
        this.count = 0;
        this.customer = false;
        this.status = '';
      });
  }

  ngOnInit(): void {}

  openpopup() {
    this.show = true;
  }

  closepopup() {
    this.show = false;
    this.view = false;
  }
  closeoverlay(e: any) {
    if (e.target.classList.contains('overlay')) {
      this.show = false;
    }
  }
  closeoverlayer(e: any) {
    if (e.target.classList.contains('overlayer')) {
      this.show = false;
      this.view = false;
    }
  }

  submit() {
    this.save();
  }

  setAuditDetails(data: any) {
    this.view = true;
    this.id = data.id;
    this.tranType = data.tranType;
    this.category = data.category;
    this.status = data.status;
    this.createdBy = data.createdBy;
    this.createdDate = data.createdDate;
    this.modifiedBy = data.modifiedBy;
    this.modifiedDate = data.modifiedDate;
    this.currentId = data.id;
  }
}
