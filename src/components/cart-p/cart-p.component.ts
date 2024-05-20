import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WordsPipe } from "../../pipes/words.pipe";
import { CartService } from '../../services/cart/cart.service';
import { ProductsService } from '../../services/products/products.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cart-p',
    standalone: true,
    templateUrl: './cart-p.component.html',
    styleUrl: './cart-p.component.css',
    imports: [CurrencyPipe, WordsPipe,FormsModule,CommonModule],
    providers:[CartService, ProductsService]
})
export class CartPComponent {
@Input() p:any
count=1
  userSessionStr: any;
  list:any
  cart:any
constructor(private cartService: CartService, private prodS:ProductsService,private myRoute:Router) {
  this.loadUserSession()
}
plus()
{
  this.count++
}
minus()
{
  if(this.count>1)
  this.count--
}
remove(id:any){
  this.cartService.deleteById(id).subscribe(
    ()=>{
      this.cartService.GetUserCart(this.userSessionStr.username).subscribe(
        (data)=>{
          this.cart = data
          this.p=[]
          for(var i=0; i<this.cart.length;i++){
            this.prodS.GetProductById(this.cart[i].id).subscribe((product)=>{
              this.p.push(product);
            })
          }
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  );
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
