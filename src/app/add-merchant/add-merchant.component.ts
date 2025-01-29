import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { API_ENDPOINTS } from '../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.css'],
})
export class AddMerchantComponent implements OnInit {
  merchantForm!: FormGroup;
  submitted = false;
  MerchantArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId = '';
  id: number = 0;
  mid: string = '';
  cashbackId: number = 0;
  delFlag: string = 'N';
  status: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  getAllMerchant() {
    this.http
      .get(API_ENDPOINTS.GETMERCHANT_URL)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.MerchantArray = resultData;
      });
  }

  register() {
    let bodyData = {
      id: this.currentId,
      mid: this.mid,
      cashbackId: this.cashbackId,
      delFlag: this.delFlag,
      status: this.status,
    };

    this.http
      .post(API_ENDPOINTS.GETMERCHANT_URL, bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
          this.snackBar.open('Merchant Add Successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });

        this.getAllMerchant();
        this.id = 0;
        this.mid = 'ABC';
        this.cashbackId = 0;
        this.delFlag = 'N';
        this.status = 'N';
      });
  }

  save() {
    if (this.currentId == '') {
      this.register();
    } else {
      alert('Failed Registration!!');
    }
  }

  ngOnInit(): void {
    this.merchantForm = this.formBuilder.group({
      customerId: [null, [Validators.required]],
      cashbackId: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  formdata: any = {};

  submit() {
    this.save();
  }
}
