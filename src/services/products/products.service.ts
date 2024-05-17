import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/Prodoct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  DB_URL = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) { }

  GetAllProducts() {
    return this.http.get(this.DB_URL);
  }
  GetProductById(id: number) {
    return this.http.get(this.DB_URL + "/" + id);
  }
  AddProduct(product: Product) {
    return this.http.post(this.DB_URL, product);
  }
}
