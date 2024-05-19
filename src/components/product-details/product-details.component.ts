import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments/comments.service';
import { Comment } from '../../models/Comment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers: [CommentsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: any;
  constructor(private commentsService: CommentsService) {
    console.log('data');
  }
  list:any[]|undefined;
  ngOnInit(): void {
    console.log('sssss',this.commentsService.GetProductComments(2).subscribe(
      (data: any) => {
        this.list = data;
        console.log('ssssssddd',data);
      },
      (err: any) => {
        console.log(err);
      }
    ));
    
  }
  haha(){
    console.log('dd',this.list);
  }
}
