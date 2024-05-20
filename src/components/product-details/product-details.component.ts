import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../services/comment/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments } from '../../interfaces/comments';
import { ProductsService } from '../../services/products/products.service';
import { WordsPipe } from '../../pipes/words.pipe';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsComponent } from '../comments/comments.component';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule,CommonModule,WordsPipe,FormsModule,CommentsComponent,ReactiveFormsModule],
  providers: [CommentsService,ProductsService,CartService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  id:string=""
  product:any;
  liked=false
  addComm=false
  addCart=false
  userSessionStr:any
  commentList:Comments[]=[]
  comment:string=""
  myCart:any
  addToCart(){
      let car={id:this.id,username:this.userSessionStr.username}

      this.cart.AddCart(car).subscribe(data =>{
        console.log("post cart",data);
      });
  }
  removeFromCart(){
    this.cart.deleteById(this.id).subscribe(
      (data)=>{
        console.log("delete cart",data)
      },
      err=>console.log("err",err)
    );
  }
  navigateCart(){
    this.addToCart()
    this.routes.navigate(['/cart'])
  }
  comFo = new FormGroup({
    comment: new FormControl("", [Validators.required]),
  });
  constructor(private routes:Router,private commentsService: CommentsService ,private myRoute: ActivatedRoute,private prodS:ProductsService,private cart:CartService) {
    console.log('data');
    this.id=myRoute.snapshot.params['id'];

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
  // "id": 5,
  // "createdAt": "2024-05-17T21:55:51.053Z",
  // "content": "this product is great",
  // "userId": 2,
  // "userName": "Mahmoud Hamdy",
  // "productId": 2
  addComment(){
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    console.log("hdaksjhkjahsdkjhsakjdhkjsa",this.userSessionStr,"          ",this.userSessionStr.username)
    let c={createdAt:currentTime,content:this.comment,userId:this.userSessionStr.id,userName:this.userSessionStr.username,productId:this.id,userImg:this.userSessionStr.img}
    this.commentsService.AddComment(c).subscribe((data)=>{
      console.log(data)
      console.log("hdaksjhkjahsdkjhsakjdhkjsa",this.userSessionStr.id,"          ",this.userSessionStr.username)
    })
    this.toggleComment()
    this.comment=""
  }
  toggleLike(){
    this.liked=!this.liked
  }
  toggleComment()
  {
    this.addComm=!this.addComm
  }
  toggleCart()
  {
    this.addCart=!this.addCart
  }
  ngOnInit(): void {
    this.commentsService.GetProductComments(+this.id).subscribe(
      (data: any) => {
        this.commentList = data;
        console.log('ssssssddd',data);
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.prodS.GetProductById(+this.id).subscribe(
      (data:any)=>{
        this.product = data
        console.log("product: ",this.product);
      }
    )
  }
}
