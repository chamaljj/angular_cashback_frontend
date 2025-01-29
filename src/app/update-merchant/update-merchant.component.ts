import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { API_ENDPOINTS } from '../app.constants';

@Component({
  selector: 'app-update-merchant',
  templateUrl: './update-merchant.component.html',
  styleUrls: ['./update-merchant.component.css'],
})
export class UpdateMerchantComponent implements OnInit {
  merchantForm!: FormGroup;
  submitted = false;
  p: number = 1;
  view = false;
  searchText: any;
  MerchantArray: [] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId = '';
  id: number = 0;
  cashbackId: number = 0;
  mid: string = '';
  status: string = '';
  delFlag: string = '';
  createdDate: string = '';
  createdBy: string = '';
  modifiedBy: string = '';
  modifiedDate: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public userService: UserService
  ) {
    this.getAllMerchant();
  }

  getAllMerchant() {
    this.isResultLoaded = true;
    this.http
      .get(API_ENDPOINTS.GETMERCHANT_URL)

      .subscribe((resultData: any) => {
        this.isResultLoaded = false;
        this.MerchantArray = resultData;
      },(error) => {

        this.isResultLoaded  = false;
      });
  }

  setUpdate(data: any) {
    this.show = true;
    (this.id = data.id), (this.mid = data.mid);
    this.cashbackId = data.cashbackId;
    this.delFlag = data.delFlag;
    this.status = data.status;
    this.currentId = data.id;
  }

  UpdateRecords(id: any) {
    let bodyData = {
      id: this.currentId,
      mid: this.mid,
      delFlag: this.delFlag,
      status: this.status,
      cashbackId: this.cashbackId,
    };

    this.http
      .put(API_ENDPOINTS.GETMERCHANT_URL + '/' + this.id, bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        alert('Successfully Updated.');
        this.closepopup();
        this.getAllMerchant();
        (this.id = 0), (this.mid = ''), (this.delFlag = '');
        this.status = '';
        this.cashbackId = 0;
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
      .delete(API_ENDPOINTS.GETMERCHANT_URL + '/' + data.id, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        alert('Successfully Deleted...');
        this.getAllMerchant();
        (this.id = 0), (this.mid = ''), (this.delFlag = '');
        this.status = '';
        this.cashbackId = 0;
      });
  }
  ngOnInit(): void {}

  show = false;

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
    this.mid = data.mid;
    this.cashbackId = data.cashbackId;
    this.delFlag = data.delFlag;
    this.status = data.status;
    this.createdBy = data.createdBy;
    this.createdDate = data.createdDate;
    this.modifiedBy = data.modifiedBy;
    this.modifiedDate = data.modifiedDate;
    this.currentId = data.id;
  }
}
