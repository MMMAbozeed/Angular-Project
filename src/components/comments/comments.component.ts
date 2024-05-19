import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CommentsService } from '../../services/comment/comments.service';
import { HttpClientModule } from '@angular/common/http';
import { Comments } from '../../interfaces/comments';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [HttpClientModule,FormsModule,DatePipe],
  providers:[ProductsService,CommentsService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
  export class CommentsComponent implements OnInit,OnChanges{
  id:string=""
  product:any;
  liked=false
  addComm=false
  addCart=false
  userSessionStr:any
  commentList:Comments[]=[]
  @Input() comment:string=""
  ngOnChanges(): void {
    this.commentsService.GetProductComments(+this.id).subscribe(
      (data: any) => {
        this.commentList = data;
        console.log('ssssssddd',data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  constructor(private commentsService: CommentsService ,private myRoute: ActivatedRoute,private prodS:ProductsService) {
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
    this.commentsService.GetProductComments(+this.id).subscribe(
      (data: any) => {
        this.commentList = data;
        console.log('ssssssddd',data);
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.comment=""
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
  }
}
