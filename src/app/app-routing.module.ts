import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { AddCashbackComponent } from './add-cashback/add-cashback.component';
import { UpdateCashbackComponent } from './update-cashback/update-cashback.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddMerchantComponent } from './add-merchant/add-merchant.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewMerchantComponent } from './view-merchant/view-merchant.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { UpdateMerchantComponent } from './update-merchant/update-merchant.component';
import { ProfileComponent } from './profile/profile.component';
import { TrantypeComponent } from './trantype/trantype.component';
import { UsersComponent } from './users/users.component';
import { CustomerCreditComponent } from './customer-credit/customer-credit.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent ,canDeactivate:[AuthGuard], data:{roles:['User','Admin','Super Admin']}},
  { path: '', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'register', component: RegisterComponent ,canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'add', component: AddCashbackComponent },
  { path: 'update', component: UpdateCashbackComponent },
  { path: 'addCustomer', component: AddCustomerComponent },
  { path: 'addMerchant', component: AddMerchantComponent },
  { path: 'viewCustomer', component: ViewCustomerComponent },
  { path: 'viewMerchant', component: ViewMerchantComponent },
  { path: 'updateCustomer', component: UpdateCustomerComponent },
  { path: 'updateMerchant', component: UpdateMerchantComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'trantype', component: TrantypeComponent },
  { path: 'users' , component: UsersComponent},
  { path: 'customerCredit' , component: CustomerCreditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
