import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'product-detail', component:ProductDetailsComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignUpComponent},
];
