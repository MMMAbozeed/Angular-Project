import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { LoginComponent } from '../components/login/login.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';
import { ErrorComponent } from '../components/error/error.component';
import { CartComponent } from '../components/cart/cart.component';
import { AuthGuard } from '../guard/auth.guard';
import { SettingComponent } from '../components/setting/setting.component';
import { InvoiceComponent } from '../components/invoice/invoice.component';

export const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignUpComponent},
  {path:'', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'product-detail/:id', component:ProductDetailsComponent, canActivate: [AuthGuard]},
  {path:"cart",component:CartComponent, canActivate: [AuthGuard]},
  {path:"setting",component:SettingComponent,canActivate: [AuthGuard]},
  {path:"invoice/:price",component:InvoiceComponent, canActivate: [AuthGuard]},
  {path:"**",component:ErrorComponent, canActivate: [AuthGuard]}
];
