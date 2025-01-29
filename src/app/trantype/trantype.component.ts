import { FormGroup,  FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component ,OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';
import { API_ENDPOINTS } from '../app.constants';

@Component({
  selector: 'app-trantype',
  templateUrl: './trantype.component.html',
  styleUrls: ['./trantype.component.css']
})

export class TrantypeComponent implements OnInit{
  tranTypeForm!:FormGroup;
  submitted = false;

  searchText: any;
  TranTypeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  show = false;
  currentId ="";
  tranTypeId: number=0;
  typeName: string="";
  delFlag: string="N";
  status: string="";

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService){

  this.getAllTranType();
  }

  getAllTranType()
  {  this.isResultLoaded = true;
    this.http.get(API_ENDPOINTS.GETTRANTYPE_URL)
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
        this.isResultLoaded = false;
        this.TranTypeArray = resultData;
    },(error) => {
      this.isResultLoaded  = false;
    });
  }

  register()
    {
    let bodyData = {
      "tran_type_id" : this.tranTypeId,
       "tran_type" : this.typeName,
       "del_flag" : this.delFlag,
       "active_status" : this.status
    };

    this.http.post(API_ENDPOINTS.GETTRANTYPE_URL,bodyData,{responseType: 'text'}).subscribe((resultData:any)=>
    {
        alert("Transaction Type Add Successfully!")
        this.getAllTranType();
        this.tranTypeId=0;
        this.typeName ="Type Name";
        this.status ="Y";
    });
  }
  setUpdate(data: any)
  {
    this.show = true;
    this.tranTypeId = data.tranTypeId;
    this.typeName = data.typeName;
    this.status = data.status;
    this.currentId = data.tranTypeId;
  }

  UpdateRecords(tranTypeId : any)
  {
      let updateBodyData = {
      "tranTypeId" : this.currentId,
      "typeName" : this.typeName,
      "delFlag": this.delFlag,
      "status" : this.status
    };

    this.http.put(API_ENDPOINTS.GETTRANTYPE_URL+"/"+this.tranTypeId,updateBodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        alert("Successfully Updated!")
        this.closepopup();
        this.getAllTranType();
        this.tranTypeId=0;
        this.typeName = "";
        this.status = "";
    });
  }
    save()
    {
    if(this.currentId == '')
      {
        this.register();
       }
      else
      { this.UpdateRecords(this.tranTypeId);
      }
    }

    ngOnInit(): void { }

    onSubmit(){
      this.submitted=true;
    }

    formdata:any={};

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
