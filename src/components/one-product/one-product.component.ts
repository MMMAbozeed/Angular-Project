import { ProductsService } from './../../services/products/products.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WordsPipe } from '../../pipes/words.pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [RouterLink,WordsPipe,CurrencyPipe,CommonModule,HttpClientModule],
  providers:[CartService,ProductsService],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent {
@Input() p:any
addCart=false
car:any
userSessionStr:any
constructor(private routes:Router,private myRoute: ActivatedRoute,private prodS:ProductsService,private cart:CartService) {
  console.log('data');

  this.loadUserSession()
}
addToCart(id:any){
  let car={id:id,username:this.userSessionStr.username}

  this.cart.AddCart(car).subscribe((data:any) =>{
    console.log("post cart",data);
  });
}

removeFromCart(id:any){
this.cart.deleteById(id).subscribe(
  (data:any)=>{
    console.log("delete cart",data)
  },
  (err:any)=>console.log("err",err)
);
}
toggleCart()
{
  this.addCart=!this.addCart
}
loadUserSession(): void {
  const userSessionStr = localStorage.getItem('userSession');

  if (userSessionStr) {
    try {
      this.userSessionStr = JSON.parse(userSessionStr);
      console.log(this.userSessionStr); // Now you can use this.userSession in your component
    } catch (error) {
      console.error('Error parsing user session from localStorage', error);
    }
  } else {
    console.log('No user session found in localStorage.');
  }
}
}
