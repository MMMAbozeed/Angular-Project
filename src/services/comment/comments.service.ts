import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  AddComment(comment: any) {
    return this.http.post(this.DB_URL, comment);
  }
}
