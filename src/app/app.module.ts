import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule} from '@angular/material/divider';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { TrantypeComponent } from './trantype/trantype.component';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerCreditComponent } from './customer-credit/customer-credit.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddCashbackComponent,
    UpdateCashbackComponent,
    AddCustomerComponent,
    AddMerchantComponent,
    ViewCustomerComponent,
    ViewMerchantComponent,
    UpdateCustomerComponent,
    UpdateMerchantComponent,
    ProfileComponent,
    TrantypeComponent,
    UsersComponent,
    CustomerCreditComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatMenuModule,
  ],

  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
