import { FormGroup,  FormBuilder ,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component ,OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';
import { API_ENDPOINTS } from '../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{
  customerForm!:FormGroup;
  submitted = false;

  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  id: number = 0;
  customerId: number = 0;
  delFlag:string="N";
  status: string="";
  cashbackId: number=0;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public userService: UserService,
    private snackBar: MatSnackBar){

  this.getAllCustomer();
  }

  getAllCustomer()
  {
    this.http.get(API_ENDPOINTS.GETCUSTOMER_URL)
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        this.CustomerArray = resultData;
    });
  }

  register()
    {
    let bodyData = {
      "id" : this.currentId,
      "customerId" : this.customerId,
      "delFlag" : this.delFlag,
      "status" : this.status,
      "cashbackId" : this.cashbackId,
    };

    this.http.post(API_ENDPOINTS.GETCUSTOMER_URL,bodyData,{responseType: 'text'}).subscribe((resultData:any)=>
    {
        this.snackBar.open('Customer Add Successfully.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']
        });
        this.getAllCustomer();
        this.id=0;
        this.customerId=0;
        this.delFlag="N";
        this.status = "N";
        this.cashbackId =0;
    });
  }

    save()
    {
    if(this.currentId == '')
      {
        this.register();
       }
    }

    ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerId: [null, [Validators.required]],
      cashbackId: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });

  }
    onSubmit(){
      this.submitted=true;
    }
    formdata:any={};

    submit(){
        this.save();
      }
}
