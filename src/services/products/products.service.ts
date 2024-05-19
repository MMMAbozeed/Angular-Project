import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // DB_URL = 'https://fakestoreapi.com/products';
  DB_URL = 'http://localhost:3000/products';
  CatUrl="https://fakestoreapi.com"
  constructor(private http: HttpClient) { }

  GetAllProducts() {
    return this.http.get(this.DB_URL);
  }
  GetProductById(id: number) {
    return this.http.get(this.DB_URL + "?id=" + id);
  }
  AddProduct(product: any) {
    return this.http.post(this.DB_URL, product);
  }
  getAllcat()
  {
   return this.http.get(this.CatUrl+"/products/categories");
  }
  getProductByCat(cat:string)
  {
    return this.http.get(this.CatUrl +'/products/category/'+cat);
  }
}
