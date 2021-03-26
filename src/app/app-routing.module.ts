import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent}, //ana sayfa
  {path:"cars",component:CarComponent},
  {path:"customers",component:CustomerComponent,canActivate:[LoginGuard]},
  {path:"rental/:carId",component:RentalComponent,canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/filter/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/filter/brand/:brandId",component:CarComponent},
  {path:"cars/filter/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent},
  {path:"cars/rental/payment/:rental",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"brand/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"color/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
