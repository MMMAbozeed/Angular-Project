import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  DB_URL = 'http://localhost:3000/comments';
  constructor(private http: HttpClient) { }

  GetAllComments() {
    return this.http.get(this.DB_URL);
  }
  GetProductComments(productId: number) {
    return this.http.get(this.DB_URL + "?productId=" + productId);
  }
  AddComment(comment: Comment) {
    return this.http.post(this.DB_URL, comment);
  }
}
