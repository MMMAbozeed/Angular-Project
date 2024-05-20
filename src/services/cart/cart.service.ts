import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  DB_URL = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) { }

  GetUserCart(userId: number) {
    return this.http.get(this.DB_URL + "?username=" + userId);
  }
  AddCart(product: any) {
    return this.http.post(this.DB_URL, product);
  }
  AddToCart(product: any) {
    return this.http.put(this.DB_URL,product);
  }
  deleteAllProduct() {
    return this.http.delete(this.DB_URL)
  }
  deleteById(productId:any ) {
    return this.http.delete(this.DB_URL+"/"+productId)
  }
}
