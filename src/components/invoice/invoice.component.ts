import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ProductsService } from '../../services/products/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CurrencyPipe,HttpClientModule,CommonModule],
  providers:[CartService,ProductsService],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {
totalPrice: number=0
userSessionStr:any
list :any[] = [];
cart:any
currentDate:Date = new Date
  constructor(private myRoute:Router,private route:ActivatedRoute,private cartS:CartService,private prodS:ProductsService){
    this.totalPrice = +this.route.snapshot.params["price"];
    this.loadUserSession()
  }
ngOnInit(): void {
  this.cartS.GetUserCart(this.userSessionStr.username).subscribe(
    (data)=>{
      this.cart = data
      for(var i=0; i<this.cart.length;i++){
        this.prodS.GetProductById(this.cart[i].id).subscribe((product:any)=>{
          this.list.push(product);
          console.log(product)
        })
      }
    },
    (err)=>{
      console.log(err);
    }
  )
}
loadUserSession(){
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
