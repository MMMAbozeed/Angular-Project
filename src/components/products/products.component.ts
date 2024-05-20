import { Component ,Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Iproducts } from '../../interfaces/products/iproducts';
import { RouterModule } from '@angular/router';
import { WordsPipe } from "../../pipes/words.pipe";
import { CartService } from '../../services/cart/cart.service';
import { OneProductComponent } from '../one-product/one-product.component';

@Component({
    selector: 'app-products',
    standalone: true,
    providers: [ProductsService,CartService],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [HttpClientModule, CommonModule, RouterModule, WordsPipe,OneProductComponent]
})
export class ProductsComponent implements OnInit {
CatList:any
list :Iproducts[] = [];
addCart=false
userSessionStr:any
constructor(private prodS:ProductsService,private cart:CartService)
{
this.loadUserSession()
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
addToCart(id:any){
  let car={id:id,username:this.userSessionStr.username}

  this.cart.AddCart(car).subscribe(data =>{
    console.log("post cart",data);
  });
}

removeFromCart(id:any){
this.cart.deleteById(id).subscribe(
  (data)=>{
    console.log("delete cart",data)
  },
  err=>console.log("err",err)
);
}
toggleCart()
{
  this.addCart=!this.addCart
}
getCat()
{

  this.prodS.getAllcat().subscribe((res:any)=>{
    console.log(res);
    this.CatList=res;
  },error=>{
    console.log(error.message);
  });
  console.log(this.CatList);
}
ngOnInit(): void {
  this.getProducts();
  this.getCat();
}
getProductsBYCat(cat:string)
{

  this.prodS.getProductByCat(cat).subscribe((res:any)=>{
    this.list=res;
  })
}
OnchangeCat(data:any){
  let val = data.target.value;
  console.log(data.target.value);
  if(val!='ALL')
    this.getProductsBYCat(val);
  else
    this.getProducts();
}
getProducts(){
  this.prodS.GetAllProducts().subscribe(
    (data:any)=>{
      console.log(data);
      this.list = data
    }
  )
}
}
