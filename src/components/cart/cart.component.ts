import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products/products.service';
import { Iproducts } from '../../interfaces/products/iproducts';
import { WordsPipe } from "../../pipes/words.pipe";
import { Router } from '@angular/router';
import { CartPComponent } from '../cart-p/cart-p.component';



@Component({
    selector: 'app-cart',
    standalone: true,
    providers: [CartService, ProductsService],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [CommonModule, FormsModule, HttpClientModule, WordsPipe ,CartPComponent]
})
export class CartComponent  implements OnInit {
  constructor(private cartService: CartService, private prodS:ProductsService,private myRoute:Router) {
    this.loadUserSession()
  }
  cart:any
  totalPrice:number=0
  list :any[] = [];
  count=1
  totalPriceFun(count: number,price:number) {
    this.totalPrice= count*price;

  }
  complete(){
    // this.cartService.GetUserCart(this.userSessionStr.username).subscribe(
    //   (data)=>{
    //     this.cart = data
    //     for(var i=0; i<this.cart.length;i++){
    //       this.cartService.deleteById(this.cart[i].id).subscribe((product:any)=>{
    //         this.totalPrice=0
    //       });
    //     }
    //     this.cart=[]
    //   },
    //   (err)=>{
    //     console.log(err);
    //   }
    // )
    this.myRoute.navigate(['/invoice/'+this.totalPrice])
  }
  cancel()
  {
    this.cartService.GetUserCart(this.userSessionStr.username).subscribe(
      (data)=>{
        this.cart = data
        for(var i=0; i<this.cart.length;i++){
          this.cartService.deleteById(this.cart[i].id).subscribe((product:any)=>{
            this.totalPrice=0
          });
        }
        this.cart=[]
      },
      (err)=>{
        console.log(err);
      }
    )
    this.myRoute.navigate(['/']);
  }
  remove(id:any){
    this.cartService.deleteById(id).subscribe(
      ()=>{
        this.cartService.GetUserCart(this.userSessionStr.username).subscribe(
          (data)=>{
            this.cart = data
            this.list=[]
            for(var i=0; i<this.cart.length;i++){
              this.prodS.GetProductById(this.cart[i].id).subscribe((product)=>{
                this.list.push(product);
              })
              console.log(i)
              console.log("list :",this.list)
            }
          },
          (err)=>{
            console.log(err);
          }
        )
      }
    );

  }
  ngOnInit(): void {
    this.cartService.GetUserCart(this.userSessionStr.username).subscribe(
      (data)=>{
        this.cart = data
        for(var i=0; i<this.cart.length;i++){
          this.prodS.GetProductById(this.cart[i].id).subscribe((product:any)=>{
            this.list.push(product);
           // console.log("pppppppppp",product[0]);
            this.totalPrice+= +product[0].price
          })
        }
      },
      (err)=>{
        console.log(err);
      }
    )
    console.log("list sad:",this.list)

    // this.prodS.GetProductById()
  }
  userSessionStr:any
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
